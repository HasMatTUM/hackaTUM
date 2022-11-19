# Get balance

from testnet_algo_client import algod_client

ADDRESS="YMISWLYZMSGP3GVDAWAGT4MD3J5ROCIFWZHWJR62QGFU5K2GKGPCUS5MYU"

account_info = algod_client.account_info(ADDRESS)
print("Account balance: {} microAlgos".format(account_info.get('amount')) + "\n")
