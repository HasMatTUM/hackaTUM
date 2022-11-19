def encode_app_args(args):
  for i, arg in enumerate(args):
    if isinstance(arg, str):
      args[i] = args[i].encode()
    elif isinstance(arg, int):
      args[i] = args[i].to_bytes(8, 'big')
    elif isinstance(arg, bytes):
      pass
    else:
      raise ValueError("Invalid input")
  return args
