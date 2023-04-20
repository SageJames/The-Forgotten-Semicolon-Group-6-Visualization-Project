#imporing pandas
import pandas as pd
 
#Importing dataset
df = pd.read_csv('vehicles.csv')
 
#Size of original dataset
#print(df.shape)
 
#Dropping the missing rows.
df_dropped = df.fillna('')
#print(df_dropped)

df_dropped.to_csv('clean_vehicles.csv')