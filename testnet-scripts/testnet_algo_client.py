from algosdk.v2client import algod

#algod_address = "http://localhost:4001"
#algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
#algod_client = algod.AlgodClient(algod_token, algod_address)

algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "lu0D1jWuxl7rB1tkodLaM8xyhJ0DIbJJ5021XimD"
headers = {"X-API-Key": algod_token}
algod_client = algod.AlgodClient(algod_token, algod_address, headers)
