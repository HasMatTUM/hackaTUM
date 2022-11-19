#!/usr/bin/env python3
from pyteal import *
import os

# Keys
vote_begin = Bytes("vote_bgn")
vote_end = Bytes("vote_end")
vote_count_yes = Bytes("votes_yes")
vote_count_no = Bytes("votes_no")
has_voted = Bytes("has_voted")

survey_title = Bytes("Title")

owner_key = Bytes("owner")

# Op messages
yes_vote = Bytes("yes")
no_vote = Bytes("no")

def approval_program():

    # Initialization
    on_creation = Seq(
            Assert(Btoi(Txn.application_args[0]) < Btoi(Txn.application_args[1])),
            # Set the initial creator
            App.globalPut(Bytes("Creator"), Txn.sender()),
            Assert(Txn.application_args.length() == Int(3)),
            App.globalPut(vote_begin, Btoi(Txn.application_args[0])),
            App.globalPut(vote_end, Btoi(Txn.application_args[1])),
            App.globalPut(survey_title, Btoi(Txn.application_args[2])),
            App.globalPut(vote_count_yes, Int(0)),
            App.globalPut(vote_count_no, Int(0)),
            Approve(),
    )

    #return is voter a creator
    is_owner = Txn.sender() == App.globalGet(Bytes("Creator"))

    get_sender_vote = App.localGetEx(Txn.sender(), App.id(), has_voted)

    vote = Seq(
        # Check if still within voting period
        Assert(And(
            Global.round() >= App.globalGet(vote_begin),
            Global.round() <= App.globalGet(vote_end)
        )),
        # Check if account already has voted
        get_sender_vote,
        Assert(Not(get_sender_vote.hasValue())),

        # Update vote counter based on vote
        Cond(
            [Txn.application_args[0] == yes_vote, App.globalPut(vote_count_yes, App.globalGet(vote_count_yes) + Int(1))],
            [Txn.application_args[0] == no_vote, App.globalPut(vote_count_no, App.globalGet(vote_count_no) + Int(1))]
        ),
        # Set the has_voted field to the sender's vote, to make sure an account cannot vote again
        App.localPut(Txn.sender(), has_voted, Txn.application_args[0]),
        Approve()
    )

    # title = Btoi(Txn.application_args[1])
    # description = Btoi(Txn.application_args[2])
    # validUntil = Btoi(Txn.application_args[3])
    # create_survey = Seq([
    #     # Check that there are 3 arguments
    #     Assert(Txn.application_args.length() == Int(3)),  
    #     # Verify that it is only 1 transaction                                   
    #     Assert(Global.group_size() == Int(1)),   
    #     # Perform default transaction checks                                            
    #     defaultTransactionChecks(Int(0)),   
    #     # Check that the price is greater than 0                                                      
    #     Assert(validUntil > Int(0)),                                                                      

    #     App.localPut(survey_title, title),
    #     App.localPut(survey_description, description),
    #     App.localPut(survey_valid_until, validUntil),
    #     Approve()
    # ])

    # We use the close out call to retract an accounts vote
    # This is only possible during the voting period, afterwards the accounts vote is immutable
    on_close_out =  Seq(
            Assert(Global.round() <= App.globalGet(vote_end)),
            get_sender_vote,
            Cond(
                [get_sender_vote.value() == yes_vote, App.globalPut(vote_count_yes, App.globalGet(vote_count_yes) - Int(1))],
                [get_sender_vote.value() == no_vote, App.globalPut(vote_count_no, App.globalGet(vote_count_no) - Int(1))]
            ),
            Approve()
    )

    reset_contract = Seq (

    ) 


    program =  Cond(
        [Txn.application_id() == Int(0), on_creation],
        # Transaction to delete the application
        [Txn.on_completion() == OnComplete.DeleteApplication, Reject()],
        # Transaction to update TEAL Programs for a contract.
        [Txn.on_completion() == OnComplete.UpdateApplication, Reject()],
        # Accounts use this transaction to close out their participation in the contract. This call can fail based on the TEAL logic
        [Txn.on_completion() == OnComplete.CloseOut, on_close_out],
        [Txn.on_completion() == OnComplete.NoOp, vote],
    )

    return program


# The clear state program can also be used to retract an accounts vote. The logic is the same as for the close out call.
def clear_state_program():
    get_sender_vote = App.localGetEx(Txn.sender(), App.id(), has_voted)

    return Seq(
            Assert(Global.round() <= App.globalGet(vote_end)),
            get_sender_vote,
            Cond(
                [get_sender_vote.value() == yes_vote, App.globalPut(vote_count_yes, App.globalGet(vote_count_yes) - Int(1))],
                [get_sender_vote.value() == no_vote, App.globalPut(vote_count_no, App.globalGet(vote_count_no) - Int(1))]
            ),
            Approve()
    )




# Compiles PyTEAL code to TEAL, .teal files are placed into ./build
if __name__ == "__main__":
    os.makedirs("build", exist_ok=True)
    approval_file = "build/voting_approval.teal"
    with open(approval_file, "w") as f:
        compiled = compileTeal(approval_program(), mode=Mode.Application, version=5)
        f.write(compiled)

    clear_state_file = "build/voting_clear_state.teal"
    with open(clear_state_file, "w") as f:
        compiled = compileTeal(clear_state_program(), mode=Mode.Application, version=5)
        f.write(compiled)