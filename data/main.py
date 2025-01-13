import random

from flask import Flask, db
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

f = open("Guess That Trap Database.csv", "r")
data = []

for i in f:
  data.append(i.split(","))

for i in range(0, len(data)):
  db[str(i)] = str(data[i][5]), ",".join(data[i][6:9]), data[i][1], data[i][-1].replace("\n", ""), data[i][3]


@app.route('/')
def get_info():
  num = random.randint(0, 155)
  info = {"rightAnswer": db[str(num)][0],
            "wrongAnswers": db[str(num)][1],
            "Anime": db[str(num)][2],
            "Image": db[str(num)][3],
            "Trait": db[str(num)][4],
            }
  return info

@app.route('/10')
def get_info15():
  num = random.sample(range(155), 15)
  info = {}

  for i in num:
    info[num.index(i)] = {"rightAnswer": db[str(i)][0],
            "wrongAnswers": db[str(i)][1],
            "Anime": db[str(i)][2],
            "Image": db[str(i)][3],
            "Trait": db[str(i)][4],
            }
  return info

@app.route('/any<amount>', methods=['GET'])
def get_infoamount(amount):
  amount = int(amount)
  if 0 < amount and amount < 156:
    num = random.sample(range(155), amount)

    info = {}

    for i in num:
      info[num.index(i)] = {"rightAnswer": db[str(i)][0],
              "wrongAnswers": db[str(i)][1],
              "Anime": db[str(i)][2],
              "Image": db[str(i)][3],
              "Trait": db[str(i)][4],
              }
    return info
  else:
      return "Argument must be between 1 and 154"

app.run(host='0.0.0.0', port=8080)




















































# from flask import Flask
# from replit import db
# import random

# # First we need the CORS thinymajig
# from flask_cors import CORS, cross_origin

# # Put this right after you declare the app

# app = Flask(__name__)
# cors = CORS(app)

# db["1"] = ["Haku", "Naruto", "Ruka Urushibara, Kousaka Reina, Kurenai Yuhi" "https://external-preview.redd.it/iph18JOCgk8h5wkDwAiro9hEiyp3slyF7e5YWKivAN0.png?format=pjpg&auto=webp&s=62bcc774e764ec2885532a33540a031ebbe4590c"]

# db["2"] = ["James", "69", "https://fictionhorizon.com/wp-content/uploads/2021/10/Armin-Arlert.jpg"]
# db["3"] = ["Jayden", "17", "https://animecorner.me/wp-content/uploads/2022/01/roronoza-zoro-statue-in-japan.jpg"]
# db["4"] = ["Joseph", "13", "https://practicaltyping.com/wp-content/uploads/2018/09/nami4-1.png"]
# db["5"] = ["Jay", "55", "https://media.comicbook.com/2021/05/demon-slayer-mugen-train-movie-nezuko-kamado-1266791.jpeg?auto=webp"]

# @app.route('/')
# def hello_world():
#   return 'Hello!'

# @app.route('/drinks')
# def get_drinks():
#   num = random.randint(1, 5)
#   drinks = {"rightAnswer": db[str(num)][0],
#             "wrongAnswers": db[str(num)][1],
#             "Anime": db[str(num)][2],
#             "Image": db[str(num)][3],
#             "Trait": db[str(num)][4],
#             }
#   return drinks

# app.run(host='0.0.0.0', port=8080)
