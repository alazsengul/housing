from flask import Flask, render_template, Response, request, jsonify, url_for
from collections import Counter
from datetime import datetime
import pytz

app = Flask(__name__)


#


group_numbers = []

with open('group_numbers.csv', 'r') as f:

    for line in f.readlines():

        split_line = line.split(",")

        if "Individual:" in split_line[0].strip():
            id = split_line[0].strip().split(" ")[1]
        else:
            id = split_line[0].strip()

        date_time = datetime.strptime(split_line[3], "%m/%d/%y %H:%M")
        timezone = pytz.timezone('US/Eastern')
        dt_aware = timezone.localize(date_time)

        group_numbers.append({"id": id, "value": split_line[1], "size": split_line[2], "time": dt_aware, "number": split_line[4]})

totals = Counter()

for g in group_numbers:
    totals[str(g["size"])] += 1


#


@app.route('/')
def index():
    return(render_template("index.html"))

@app.route('/run_script', methods=['GET', 'POST'])
def run_script():

    global group_numbers
    global totals
    before_you = []
    your_info = []

    query = request.get_json()['query']
    method = request.get_json()['method']

    for i in range(len(group_numbers)):

        g = group_numbers[i]

        if (method == "lottery") and (str(g["number"]).strip() == str(query)):
            your_datetime = g["time"]
            your_info = g["time"].strftime("%m/%d/%y %H:%M")
            before_you = group_numbers[:i]

            break

        elif (method == "group") and (str(g["id"]).strip() == str(query)):
            your_datetime = g["time"]
            your_info = g["time"].strftime("%m/%d/%y %H:%M")
            before_you = group_numbers[:i]

            break

        elif (method == "uni") and (str(g["id"]).strip() == str(query)):
            your_datetime = g["time"]
            your_info = g["time"].strftime("%m/%d/%y %H:%M")
            before_you = group_numbers[:i]

            break

    right_now = datetime.now(pytz.timezone('US/Eastern'))

    if right_now > your_datetime:
        your_info = "You should've already picked!"

    before_you_count = Counter()

    for b in before_you:

        if b["time"] >= right_now:

            before_you_count[str(b["size"])] += 1


    result = []

    for i in range(10):

        row = []

        row.append(str(i + 1))
        row.append(before_you_count[str(i + 1)])
        row.append(totals[str(i + 1)])

        result.append(row)

    return(jsonify(result = result, your_info = your_info))


if __name__ == '__main__':

    app.run(debug = True)
