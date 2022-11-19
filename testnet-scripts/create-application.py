from algosdk.future.transaction import *

from base64 import b64decode

import json

from testnet_algo_client import algod_client

from helper import encode_app_args

SENDER="YMISWLYZMSGP3GVDAWAGT4MD3J5ROCIFWZHWJR62QGFU5K2GKGPCUS5MYU"
SENDER_PRIVATE="gPXtqprl9IzL5qWl7bSiIOSU9geDMwQznzY8uKxGOEbDESsvGWSM/ZqjBYBp8YPaexcJBbZPZMfagYtOq0ZRng=="
NAME="counter"
APP_ARGS=[]

# https://betterprogramming.pub/getting-started-with-algorand-413d3474cb5

APP_ARGS=encode_app_args(APP_ARGS)

params = algod_client.suggested_params()

def compile_program(file_name):

  global algod_client

  source_code = None

  with open(file_name, 'r') as f:
    source_code = f.read()

  response = algod_client.compile(source_code)

  return b64decode(response['result'])

txn = ApplicationCreateTxn(
    sender=SENDER,
    sp=algod_client.suggested_params(),
    on_complete=OnComplete.NoOpOC.real,
    approval_program=compile_program(f"compile/{NAME}_approval.teal"),
    clear_program=compile_program(f"compile/{NAME}_clear_state.teal"),
    global_schema=StateSchema(num_uints=1, num_byte_slices=1),
    local_schema=StateSchema(num_uints=0, num_byte_slices=0),
    app_args=APP_ARGS
)

signedTxn = txn.sign(SENDER_PRIVATE)
txid = algod_client.send_transaction(signedTxn)
print("Successfully sent transaction with txID: {}".format(txid))

try:
    response = wait_for_confirmation(algod_client, txid, 4)  
except Exception as err:
    print(err)
else:

  print("Transaction information: {}".format(json.dumps(response, indent=4)))

  print(f"Created App with id: {response['application-index']}  in tx: {txid}")

  sender_account_info = algod_client.account_info(SENDER)
  print("Sender account balance: {} microAlgos".format(sender_account_info.get('amount')) )
