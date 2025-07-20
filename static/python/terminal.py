import math
import urllib.request

BLACK = 0
RED = 1
GREEN = 2
YELLOW = 3
BLUE = 4
MAGENTA = 5
CYAN = 6
WHITE = 7
BRIGHT_BLACK = 60
BRIGHT_RED = 61
BRIGHT_GREEN = 62
BRIGHT_YELLOW = 63
BRIGHT_BLUE = 64
BRIGHT_MAGENTA = 65
BRIGHT_CYAN = 66
BRIGHT_WHITE = 67

class Pixel:
    """
    Represents a single pixel in a raster image. This type is mutable.
    """
    def __init__(self, r, g, b):
        """
        Constructs a new pixel using integer data.

        @type r: int
        @param r: The value of the red channel. This must be between 0 and 255.
        @type g: int
        @param g: The value of the green channel. This must be between 0 and 255.
        @type b: int
        @param b: The value of the blue channel. This must be between 0 and 255.
        """
        self.__r = 0
        self.__g = 0
        self.__b = 0
        self.set_red(r)
        self.set_green(g)
        self.set_blue(b)
    def set_red(self, r):
        """
        Sets the red channel value of the pixel.

        @type r: int
        @param r: The value of the red channel. This must be between 0 and 255.
        """
        if type(r) is not int:
            raise RuntimeError("Pixel data must be an int.")
        if r < 0 or r > 255:
            raise RuntimeError("Pixel data is out of range.")
        self.__r = r
    def set_green(self, g):
        """
        Sets the green channel value of the pixel.

        @type g: int
        @param g: The value of the green channel. This must be between 0 and 255.
        """
        if type(g) is not int:
            raise RuntimeError("Pixel data must be an int.")
        if g < 0 or g > 255:
            raise RuntimeError("Pixel data is out of range.")
        self.__g = g
    def set_blue(self, b):
        """
        Sets the blue channel value of the pixel.

        @type b: int
        @param b: The value of the blue channel. This must be between 0 and 255.
        """
        if type(b) is not int:
            raise RuntimeError("Pixel data must be an int.")
        if b < 0 or b > 255:
            raise RuntimeError("Pixel data is out of range.")
        self.__b = b
    def red(self):
        """
        Gets the red channel value of the pixel.

        @rtype: int
        @returns: A value between 0 and 255 representing the intensity.
        """
        return self.__r
    def green(self):
        """
        Gets the green channel value of the pixel.

        @rtype: int
        @returns: A value between 0 and 255 representing the intensity.
        """
        return self.__g
    def blue(self):
        """
        Gets the blue channel value of the pixel.

        @rtype: int
        @returns: A value between 0 and 255 representing the intensity.
        """
        return self.__b
    def __eq__(self, rhs):
        """
        Compares two pixels to determine if they are equal.

        @type rhs: Pixel
        @param rhs: The other Pixel for comparison.
        @rtype: bool
        @returns: True if both Pixels have the same channel data. False otherwise.
        """
        return self.to_tuple() == rhs.to_tuple()
    def __str__(self):
        """
        Converts a Pixel to a string for output.

        @rtype: str
        @returns: A string representing the Pixel as a tuple. This is formatted as "(r, g, b)".
        """
        return str(self.to_tuple())
    def to_tuple(self):
        """
        Converts a Pixel to a 3-tuple for ease of comparison and output.

        @rtype: tuple
        @returns: A 3-tuple containing red, green, and blue color channel data in that order.
        """
        return (self.__r, self.__g, self.__b)

class Image:
    """
    Represents a raster image using Pixels as data.
    """
    def __init__(self, width, height):
        """
        Constructs a new image with the specified width and height.

        @type width: int
        @param width: The width of the image in Pixels. This must be greater than 0.
        @type height: int
        @param height: The height of the image in Pixels. This must be greater than 0.
        """
        if type(width) is not int or type(height) is not int:
            raise RuntimeError("Image dimensions must be integer values.")
        if width < 1 or height < 1:
            raise RuntimeError("Images must have at least one pixel.")
        self.__width = width
        self.__height = height
        # The raster is 2 dimensional and must be accessed as such.
        self.__raster = [ Pixel(0, 0, 0) ] * (width * height)
    def get(self, x, y):
        """
        Get a Pixel from the Image's raster grid.

        @type x: int
        @param x: The x-axis coordinate of the desired Pixel. This must be within the bounds of the raster grid or
                  an error will be raised.
        @type y: int
        @param y: The y-axis coordinate of the desired Pixel. This must be within the bounds of the raster grid or
                  an error will be raised.
        @rtype: Pixel
        @returns: The Pixel at (x, y) in the raster.
        """
        return self.__raster[y * self.__width + x]
    def set(self, x, y, pixel):
        """
        Set a Pixel from the Image's raster grid.

        @type x: int
        @param x: The x-axis coordinate of the desired Pixel. This must be within the bounds of the raster grid or
                  an error will be raised.
        @type y: int
        @param y: The y-axis coordinate of the desired Pixel. This must be within the bounds of the raster grid or
                  an error will be raised.
        @type pixel: Pixel
        @param pixel: The Pixel data to set the cell at (x, y) to.
        """
        if type(pixel) is not Pixel:
            raise RuntimeError("Pixel data must actually be pixel data.")
        self.__raster[y * self.__width + x] = pixel
    def width(self):
        return self.__width
    def height(self):
        return self.__height

def __next_line(file):
    line = file.readline().decode("ascii").strip()
    while line.startswith("#"):
        line = file.readline().decode("ascii").strip()
    return line

def __remap(a, b, c, d, x):
    return c + (x - a) * (d - c) / (b - a)

def __flt(a, b, epsilon = 1e-10):
    return math.fabs(a - b) > epsilon and a < b

# ITU-R BT.709 Gamma Decode Function
def __degamma(v):
    if __flt(v, 0.081):
        return v / 4.5
    else:
        return ((v + 0.099) / 1.099) ** (1.0 / 0.45)

def __load_ppm_data(file):
    magic = file.readline().decode("ascii").strip()
    if magic != "P6":
        raise RuntimeError("Invalid image format: \"" + str(magic) + "\".")
    lines = [ ]
    while len(lines) < 3:
        lines.extend(__next_line(file).split())
    width = int(lines[0])
    height = int(lines[1])
    maxcolor = int(lines[2])
    bytes_per_channel = 1 if maxcolor < 256 else 2
    res = Image(width * 2, height)
    for i in range(height):
        for j in range(0, width * 2, 2):
            red = __remap(0, maxcolor, 0, 1, int.from_bytes(file.read(bytes_per_channel), byteorder="big"))
            green = __remap(0, maxcolor, 0, 1, int.from_bytes(file.read(bytes_per_channel), byteorder="big"))
            blue = __remap(0, maxcolor, 0, 1, int.from_bytes(file.read(bytes_per_channel), byteorder="big"))
            red = int(__remap(0, 1, 0, 255, __degamma(red)))
            green = int(__remap(0, 1, 0, 255, __degamma(green)))
            blue = int(__remap(0, 1, 0, 255, __degamma(blue)))
            res.set(j, i, Pixel(red, green, blue))
            res.set(j + 1, i, Pixel(red, green, blue))
    return res

def load_ppm(path):
    """
    Load a PPM file and convert it to an Image.

    @param path: The path to the desired file to load.
    @rtype: Image
    @returns: An Image object loaded with the data in the indicated file. The resulting image will be processed using
              the ITU-R BT.709 gamma transfer function.
    """
    file = open(path, "rb")
    try:
        return __load_ppm_data(file)
    finally:
        file.close()

def load_ppm_from_web(url):
    """
    Load a PPM file from the Web and convert it to an Image.

    @param url: The URL of a PPM file to load.
    @rtype: Image
    @returns: An Image object loaded with the data in the indicated file. The resulting image will be processed using
              the ITU-R BT.709 gamma transfer function.
    """
    req = urllib.request.Request(url, data=None, headers={ "User-Agent": "curl/7.54.1" })
    r = urllib.request.urlopen(req)
    try:
        return __load_ppm_data(r)
    finally:
        r.close()

def emit(code):
    """
    Emit raw terminal commands.

    @type code: str
    @param code: The terminal control code to emit.
    """
    print("\x1b[" + str(code), end="")

def begin_color_sequence(foreground, background = None):
    """
    Generate the commands required to begin a 4-bit color sequence.

    @type foreground: int
    @param foreground: The index of the foreground color value.
    @type background: int
    @param background: The index of the background color value. This defaults to None, in which case the terminal
                       default is used.
    @rtype: str
    @returns: A color begin sequence such as "\x1b[31m"
    """
    if background:
        return "\x1b[" + str(foreground + 30) + ";" + str(background + 40) + "m"
    else:
        return "\x1b[" + str(foreground + 30) + "m"

def begin_rgb_color_sequence(foreground, background = None):
    """
    Generate the commands required to begin a 24-bit color sequence.

    @type foreground: tuple
    @param foreground: A 3-tuple of Pixel data representing the the foreground color value. This can be generated
                       by Pixel.to_tuple().
    @type background: tuple
    @param foreground: A 3-tuple of Pixel data representing the the background color value. This can be generated
                       by Pixel.to_tuple(). This defaults to None, in which case the terminal default is used.
    @rtype: str
    @returns: A color begin sequence such as "\x1b[31m"
    """
    res = "\x1b[38;2;" + str(foreground[0]) + ";" + str(foreground[1]) + ";" + str(foreground[2]) + "m"
    if background:
        res = res + "\x1b[48;2;" + str(background[0]) + ";" + str(background[1]) + ";" + str(background[2]) + "m"
    return res

def end_color_sequence():
    """
    Generate the commands required to reset the terminal to its default color and style behavior.

    @rtype: str
    @returns: Always "\x1b[0m".
    """
    return "\x1b[0m"

def clear():
    """
    Emit a series of commands to clear the terminal screen and scrollback buffer.
    """
    emit("2J")
    emit("3J")
    emit("0;0H")

def reset_cursor():
    """
    Emit a command to reset the cursor to the upper left of the terminal screen. This is useful for quickly redrawing
    an image.
    """
    emit("0;0H")

def hide_cursor():
    """
    Emit a command to hide the cursor. This is useful for image drawing.
    """
    emit("?25l")

def show_cursor():
    """
    Emit a command to show the cursor.
    """
    emit("?25h")

def display(image):
    """
    Display an Image object on the current terminal screen.

    @type image: Image
    @param image: The Image to display.
    """
    if type(image) is not Image:
          raise RuntimeError("Image data must be stored in a terminal Image object.")
    for i in range(image.height()):
        for j in range(image.width()):
            pixel = image.get(j, i).to_tuple()
            print(begin_rgb_color_sequence((0, 0, 0), pixel) + " " + end_color_sequence(), end="")
        print("")
