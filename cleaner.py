# import pandas
import pandas as pd

# Importing dataset
df = pd.read_csv('reduced_vehicles.csv')

# get the number of rows in the dataframe
num_rows = len(df)

# drop the last 2000 rows
df = df.drop(index=range(num_rows - 80000, num_rows))

# save the reduced dataframe to a new csv file
df.to_csv('reduced_vehicles2.csv', index=False)