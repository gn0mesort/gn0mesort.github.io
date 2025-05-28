"""
box.py

The goal of this program is to draw boxes using the provided utilities.

Your program should have the following features:

1. It should ask the user how wide their terminal is in characters (80 is a safe size)
2. It should ask the user how tall their terminal is in characters (24 is a safe size)
3. It should create an Image object like: Image(width, height)
4. It should provide a complete box() function that draws a box into an Image
5. It should draw at least two boxes into the terminal
6. Can you draw other shapes? Could you use the structure of box() to create a triangle() function or a circle function()? Can you write text into your boxes?

Example input and output:

How wide is your display? 80
How tall is your display? 24
*---------*                                                                     
|         |                                                                     
| *--*    |                                                                     
| |  |    |                                                                     
| |  |    |                                                                     
| *--*    |                                                                     
|         |                                                                     
|         |                                                                     
|         |                                                                     
|        *----------*                                                           
*--------|          |                                                           
         |          |                                                           
         |          |                                                           
         |          |                                                           
         |          |                                                           
         |          |                                                           
         |          |                                                           
         |          |                                                           
         |          |                                                           
         |          |                                                           
         *----------* 


How wide is your display? 80
How tall is your display? 24
*---------*                                                                     
|         |                                                                     
|         |                                                                     
|         |                                                                     
|         |                                                                     
|    *    |                                                                     
|         |                                                                     
|         |                                                                     
|         |                                                                     
|         |                                                                     
*---------*       


How wide is your display? 80
How tall is your display? 24
*------------------------------------------------------------------------------*
|                                                                              |
|                                                                              |
|                                                                              |
|                                                                              |
|                                                                              |
|                                 *---------*                                  |
|                                 |         |                                  |
|                                 |         |                                  |
|                                 |         |                                  |
|                                 |         |                                  |
|                                 |         |                                  |
|                                 |         |                                  |
|                                 |         |                                  |
|                                 |         |                                  |
|                                 |         |                                  |
|                                 *---------*                                  |
|                                                                              |
|                                                                              |
|                                                                              |
|                                                                              |
|                                                                              |
|                                                                              |
*------------------------------------------------------------------------------*

Hints:

- Think of your Image like a piece of graph paper with the origin in the upper left corner and the y-axis getting more positive (rather than more negative) as you go down the page
- Look at the structure of Image.display() can you use for-loops to draw boxes in the same way?

"""


##################################
# Don't Modify This!             #
##################################

class Image:
    def __init__(self, width, height):
        if width <= 0:
            width = 1
        if height <= 0:
            height = 1
        self.__width = width
        self.__height = height
        self.__data = [ " " ] * (self.__width * self.__height)
    def set(self, x, y, value):
        if x >= self.__width or y >= self.__height:
            return None
        self.__data[y * self.__width + x] = value
    def get(self, x, y):
        if x >= self.__width or y >= self.__height:
            return None
        return self.__data[y * self.__width + x]
    def display(self):
        for i in range(self.__height):
            for j in range(self.__width):
                print(self.__data[i * self.__width + j], sep="", end="")
            print()

##################################
# End of Image Object            #
##################################

def box(image, left, top, right, bottom):
    # Replace pass with your code!
    pass

# Write the rest of your program here!