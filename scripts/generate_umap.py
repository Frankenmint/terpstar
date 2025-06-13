import pandas as pd
import umap
import json
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()  # load .env into environment

DB_URL = os.getenv("DATABASE_URL")  # or whatever your variable is

# Update connection string to your local MariaDB DB
engine = create_engine(DB_URL)

# Read terpene data
df = pd.read_sql("SELECT id, name, terpenes FROM Strain WHERE terpenes IS NOT NULL", engine)
df['terpenes'] = df['terpenes'].apply(json.loads)

# Normalize terpene matrix
terp_matrix = pd.DataFrame(df['terpenes'].tolist()).fillna(0.0)
embedding = umap.UMAP(n_neighbors=10, min_dist=0.3, metric='cosine').fit_transform(terp_matrix)

# Add 2D coords back
df['terpMapX'] = embedding[:, 0]
df['terpMapY'] = embedding[:, 1]

# Update DB with new coords
for _, row in df.iterrows():
    engine.execute(
        "UPDATE Strain SET terpMapX = %s, terpMapY = %s WHERE id = %s",
        (float(row['terpMapX']), float(row['terpMapY']), int(row['id']))
    )

print("UMAP coordinates updated successfully.")
