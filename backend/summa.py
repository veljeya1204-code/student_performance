# import bcrypt

# #
# plain = "admin123"

# # create new hash from same password
# new_hash = bcrypt.hashpw(plain.encode(), bcrypt.gensalt())
# print(new_hash)
# print("Hash:", new_hash)
# print("Check:", bcrypt.checkpw(plain.encode(), new_hash))


import bcrypt

password = "Parent123".encode("utf-8")
hashed = bcrypt.hashpw(password, bcrypt.gensalt())

print(hashed.decode())