#!/usr/bin/env python3
from pyteal import *
import os

from counter import *

approval_file = contract_name + "_approval.teal"
clear_state_file = contract_name + "_clear_state.teal"

with open(approval_file, "w") as f:
    compiled = compileTeal(approval_program(), mode=Mode.Application, version=5)
    f.write(compiled)

with open(clear_state_file, "w") as f:
    compiled = compileTeal(clear_state_program(), mode=Mode.Application, version=5)
    f.write(compiled)
