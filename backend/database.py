import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv
from urllib.parse import urlparse

load_dotenv()

class Database:
    def __init__(self):
        self.connection = None
        self.cursor = None
    # def connect(self):
    #     try:
    #         if self.connection and not self.connection.closed:
    #            return self.connection

    #         self.connection = psycopg2.connect(
    #         host=self.host,
    #         database=self.database,
    #         user=self.user,
    #         password=self.password
    #     )

    #         return self.connection

    #     except Exception as e:
    #         print("DB Connection error:", e)
    #         return None

    def connect(self):
        """Establish database connection"""
        try:
            # Production: Use Render DATABASE_URL
            # db_url = os.getenv('DATABASE_URL')
            db_url="postgresql://jai:M2MxUxO6ytDTtjrSIXINhYgBzff0ppQA@dpg-d6f7rpngi27c73cok0m0-a.oregon-postgres.render.com/student_performance_0ixx"
            if db_url:
                # Parse full URL: postgresql://user:pass@host:port/db
                result = urlparse(db_url)
                self.connection = psycopg2.connect(
                    host=result.hostname,
                    port=result.port,
                    database=result.path[1:],  # Remove leading /
                    user=result.username,
                    password=result.password,
                    sslmode='require'  # Render SSL required
                )
            else:
                # Local fallback
                self.connection = psycopg2.connect(
                    host=os.getenv('DB_HOST', 'localhost'),
                    database=os.getenv('DB_NAME', 'postgres'),
                    user=os.getenv('DB_USER', 'postgres'),
                    password=os.getenv('DB_PASSWORD', '120405'),
                    port=os.getenv('DB_PORT', '5432')
                )
        
        
        # try:
        #     self.connection = psycopg2.connect(
        #         host="localhost",
        #         database="postgres",
        #         user="postgres",
        #         password="120405",
        #         port="5432"
        #     )

            self.cursor = self.connection.cursor(cursor_factory=RealDictCursor)
            print("✅ Database connected successfully")
            return True

        except Exception as e:
            print(f"❌ Database connection error: {e}")
            return False
    
    def disconnect(self):
        """Close database connection"""
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
    
    # def execute_query(self, query, params=None, fetch=True):
    #     """Execute a SQL query"""
    #     try:
    #         if not self.connection:
    #             self.connect()
            
    #         self.cursor.execute(query, params)
            
    #         if fetch:
    #             result = self.cursor.fetchall()
    #             return result
    #         else:
    #             self.connection.commit()
    #             return True
    #     except Exception as e:
    #         if self.connection:
    #             self.connection.rollback()
    #         print(f"Query execution error: {e}")
    #         return None if fetch else False

    # def execute_query(self, query, params=None, fetch=True):
    # try:
    #     if not self.connection or self.connection.closed:
    #         self.connect()

    #     with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
    #         cursor.execute(query, params)

    #         if fetch:
    #             return cursor.fetchall() or []
    #         else:
    #             self.connection.commit()
    #             return True

    # except Exception as e:
    #     self.connection.rollback()
    #     print("Database error:", e)
    #     return None


    
    def execute_query(self, query, params=None, fetch=True):
        try:
            if not self.connection or self.connection.closed:
              self.connect()

            with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute(query, params)

                if fetch:
                    return cursor.fetchall()
                else:
                    self.connection.commit()
                    return True

        except Exception as e:
            self.connection.rollback()
            print("Database error:", e)
            return None
    
    # def execute_one(self, query, params=None):
    #     """Execute query and fetch one result"""
    #     try:
    #         if not self.connection:
    #             self.connect()
            
    #         self.cursor.execute(query, params)
    #         result = self.cursor.fetchone()
    #         return result
    #     except Exception as e:
    #         print(f"Query execution error: {e}")
    #         return None
    def execute_one(self, query, params=None):
        try:
            if not self.connection or self.connection.closed:
               self.connect()

            with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
               cursor.execute(query, params)
               return cursor.fetchone()

        except Exception as e:
            print("Query execution error:", e)
            return None
    
    def execute_insert(self, query, params=None):
        """Execute INSERT and return inserted ID"""
        try:
            if not self.connection:
                self.connect()
            
            self.cursor.execute(query + " RETURNING id", params)
            result = self.cursor.fetchone()
            self.connection.commit()
            return result['id'] if result else None
        except Exception as e:
            if self.connection:
                self.connection.rollback()
            print(f"Insert execution error: {e}")
            return None
    def execute_select(self, query, params=None):
        try:
           self.cursor.execute(query, params)
           return self.cursor.fetchall() or []
        except Exception as e:
           print("Query execution error:", e)
           return []

    def execute_action(self, query, params=None):
        try:
           self.cursor.execute(query, params)
           self.connection.commit()
        except Exception as e:
           print("Query execution error:", e)
# Create global database instance
db = Database()
