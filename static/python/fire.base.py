import time
import random
import terminal

class Stopwatch:
    def __init__(self):
        self.__start = time.time()
    def reset(self):
        duration = time.time() - self.__start
        self.__start = time.time()
        return duration

class AverageFrameRate:
    def __init__(self):
        self.__average = 0.0
    def update(self, delta_time):
        self.__average = (delta_time - self.__average) * 0.03
    def __str__(self):
        return str(1 / self.__average) if self.__average != 0.0 else str(0.0)

colors = [
    terminal.Pixel(0, 0, 0),
    terminal.Pixel(7, 7, 7),
    terminal.Pixel(31, 7, 7),
    terminal.Pixel(47, 15, 7),
    terminal.Pixel(71, 15, 7),
    terminal.Pixel(87, 23, 7),
    terminal.Pixel(103, 31, 7),
    terminal.Pixel(119, 31, 7),
    terminal.Pixel(143, 39, 7),
    terminal.Pixel(159, 47, 7),
    terminal.Pixel(175, 63, 7),
    terminal.Pixel(191, 71, 7),
    terminal.Pixel(199, 71, 7),
    terminal.Pixel(223, 79, 7),
    terminal.Pixel(223, 87, 7),
    terminal.Pixel(223, 87, 7),
    terminal.Pixel(215, 95, 7),
    terminal.Pixel(215, 103, 15),
    terminal.Pixel(207, 111, 15),
    terminal.Pixel(207, 119, 15),
    terminal.Pixel(207, 127, 15),
    terminal.Pixel(207, 135, 23),
    terminal.Pixel(199, 135, 23),
    terminal.Pixel(199, 143, 23),
    terminal.Pixel(199, 151, 31),
    terminal.Pixel(191, 159, 31),
    terminal.Pixel(191, 159, 31),
    terminal.Pixel(191, 167, 39),
    terminal.Pixel(191, 167, 39),
    terminal.Pixel(191, 175, 47),
    terminal.Pixel(183, 175, 47),
    terminal.Pixel(183, 183, 47),
    terminal.Pixel(183, 183, 55),
    terminal.Pixel(207, 207, 111),
    terminal.Pixel(223, 223, 159),
    terminal.Pixel(239, 239, 199),
    terminal.Pixel(255, 255, 255),
]

def clamp(v, l, h):
    if v > h:
        return h
    if v < l:
        return l
    return v

def configure():
    pass

def spread_fire(image, x, y):
    pass

def update_fire(image):
    pass

pass

