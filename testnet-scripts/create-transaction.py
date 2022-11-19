from algosdk.future import transaction
from algosdk import constants

import json
import base64

from testnet_algo_client import algod_client

# Parameters

SENDER="YMISWLYZMSGP3GVDAWAGT4MD3J5ROCIFWZHWJR62QGFU5K2GKGPCUS5MYU"
SENDER_PRIVATE="gPXtqprl9IzL5qWl7bSiIOSU9geDMwQznzY8uKxGOEbDESsvGWSM/ZqjBYBp8YPaexcJBbZPZMfagYtOq0ZRng=="

RECEIVER="XEKBHKTQLSYQ7LDAN4XBK5CEAKPWK2LUO4DE72S3FGRWBYHD6PDOQKVBJM"

NOTE="Hello world"

# In microalgo
AMOUNT=3 * 10**6

# Script

params = algod_client.suggested_params()

sender_account_info = algod_client.account_info(SENDER)
receiver_account_info = algod_client.account_info(RECEIVER)

print("Sender account balance: {} microAlgos".format(sender_account_info.get('amount')) )
print("Receiver account balance: {} microAlgos".format(receiver_account_info.get('amount')) + "\n")

# comment out the next two (2) lines to use suggested fees
#params.flat_fee = True
#params.fee = constants.MIN_TXN_FEE 

note = NOTE.encode()
unsigned_txn = transaction.PaymentTxn(SENDER, params, RECEIVER, AMOUNT, None, note)

signed_txn = unsigned_txn.sign(SENDER_PRIVATE)

txid = algod_client.send_transaction(signed_txn)
print("Successfully sent transaction with txID: {}".format(txid))

# wait for confirmation 
try:
    confirmed_txn = transaction.wait_for_confirmation(algod_client, txid, 4)  
except Exception as err:
    print(err)
else:

  print("Transaction information: {}".format(
      json.dumps(confirmed_txn, indent=4)))
  print("Decoded note: {}".format(base64.b64decode(
      confirmed_txn["txn"]["txn"]["note"]).decode()))

  print("Amount transfered: {} microAlgos".format(AMOUNT) )    
  print("Fee: {} microAlgos".format(params.fee) + "\n") 

  sender_account_info = algod_client.account_info(SENDER)
  receiver_account_info = algod_client.account_info(RECEIVER)

  print("Sender account balance: {} microAlgos".format(sender_account_info.get('amount')) )
  print("Receiver account balance: {} microAlgos".format(receiver_account_info.get('amount')) + "\n")
