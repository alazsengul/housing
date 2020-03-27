with open('numbers.csv', 'r') as the_file:
    raw = the_file.readlines()

with open('group_numbers.csv', 'a') as f:

    for line in raw:

        good_line = True

        for column in line.split(","):
            if not column:
                good_line = False

        if "Lottery Number" in line.split(",")[4]:
            good_line = False

        if good_line:
            f.write(line)
