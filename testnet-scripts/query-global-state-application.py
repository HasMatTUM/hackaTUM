from testnet_algo_client import algod_client

from base64 import b64decode

APP_ID="123983031"

info = algod_client.application_info(APP_ID)

for row in info['params']['global-state']:
    row['key'] = b64decode(row['key'])
    print(row)
