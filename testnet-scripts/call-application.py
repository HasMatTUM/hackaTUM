from algosdk.future.transaction import *

import json

from testnet_algo_client import algod_client

SENDER="YMISWLYZMSGP3GVDAWAGT4MD3J5ROCIFWZHWJR62QGFU5K2GKGPCUS5MYU"
SENDER_PRIVATE="gPXtqprl9IzL5qWl7bSiIOSU9geDMwQznzY8uKxGOEbDESsvGWSM/ZqjBYBp8YPaexcJBbZPZMfagYtOq0ZRng=="
APP_ID="123983031"
APP_ARGS=["inc"]
NAME="counter"

# https://betterprogramming.pub/getting-started-with-algorand-413d3474cb5

params = algod_client.suggested_params()

txn = ApplicationCallTxn(
    sender=SENDER,
    sp=algod_client.suggested_params(),
    index=APP_ID,
    on_complete=OnComplete.NoOpOC,
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

  sender_account_info = algod_client.account_info(SENDER)
  print("Sender account balance: {} microAlgos".format(sender_account_info.get('amount')) )
