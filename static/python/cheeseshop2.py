import tkinter as tk
from tkinter import ttk
from tkinter import filedialog

class ShopItem:
    """
    A class that represents individual shop items. Each item has a name, and a price.
    """
    def __init__(self, name, gold, silver, copper):
        """
        Construct a shop item.

        @type name: str
        @param name: A name for the item. This can be any text.
        @type gold: int
        @param gold: The price of the item in gold. This can be any integer amount.
        @type silver: int
        @param silver: The price of the item in silver. This can be any integer amount, but numbers greater than 100
                       will be converted up to gold.
        @type copper: int
        @param copper: The price of the item in copper. This can be any integer amount, but numbers greater than 100
                       will be converted to silver.
        """
        if type(name) is not str:
            raise RuntimeError("\"name\" must be a string.")
        if type(gold) is not int or type(silver) is not int or type(copper) is not int:
            raise RuntimeError("\"gold\", \"silver\", and \"copper\" must be integers.")
        if gold < 0 or silver < 0 or copper < 0:
            raise RuntimeError("Items cannot have negative prices.")
        self.__name = name
        self.__gold = gold
        self.__silver = silver
        self.__copper = copper
        while self.__copper >= 100:
            copper = copper - 100
            silver = silver + 1
        while self.__silver >= 100:
            silver = silver - 100
            gold = gold + 1
    def name(self):
        """
        Retrieve the ShopItem's name.

        @rtype: str
        @returns: The name.
        """
        return self.__name
    def gold(self):
        """
        Retrieve the ShopItem's price in gold.

        @rtype: int
        @returns: The corresponding price.
        """
        return self.__gold
    def silver(self):
        """
        Retrieve the ShopItem's price in silver.

        @rtype: int
        @returns: The corresponding price.
        """
        return self.__silver
    def copper(self):
        """
        Retrieve the ShopItem's price in copper.

        @rtype: int
        @returns: The corresponding price.
        """
        return self.__copper
    def __str__(self):
        """
        Convert the ShopItem to a string.

        @rtype: str
        @returns: A string of the format "name: 123g 123s 123c"
        """
        res = [ ]
        res.extend(self.__name)
        res.extend(": ")
        if self.__gold != 0:
            res.extend(str(self.__gold))
            res.extend("g ")
        if self.__silver != 0:
            res.extend(str(self.__silver))
            res.extend("s ")
        if self.__copper != 0:
            res.extend(str(self.__copper))
            res.extend("c")
        if self.__gold == 0 and self.__silver == 0 and self.__copper == 0:
            res.extend("0g 0s 0c")
        return "".join(res).strip()

def calculate_price(cart, item):
    """
    Calculate the price of a single shop item based on the user's current cart.

    @type cart: dict
    @param cart: The user's cart as a dictionary. Each dictionary value is another dictionary with keys "item" and
                 "quantity".
    @type item: ShopItem
    @param item: The ShopItem to calculate the price for.
    @rtype: tuple
    @returns: A 3-tuple of integers. These are the price in gold, silver, and copper respectively.
    """
    gold = 0
    silver = 0
    copper = 0
    # Here we need to calculate the price in gold, silver, and copper for the input item and the input quantity.
    # The initial values are simple to calculate by multiplying each price by the quantity.
    # After we get those values, though, we need to ensure that silver and copper are both less than 100. To do that,
    # we need to add one silver for every copper and then one gold for every silver. The order here is important!
    pass
    return (gold, silver, copper)

def calculate_total(cart):
    """
    Calculate the total price of all shop items in the user's cart.

    @type cart: dict
    @param cart: The user's cart as a dictionary. Each dictionary value is another dictionary with keys "item" and
                 "quantity".
    @rtype: tuple
    @returns: A 3-tuple of integers. These are the price in gold, silver, and copper respectively.
    """
    gold = 0
    silver = 0
    copper = 0
    # This works similarly to calculate_price(), but we need to perform the calculation for every structure in cart.
    # Each value in the cart is a structure like { "item": ShopItem(), "quantity": 0 }. From these, we need to
    # calculate the total price in gold, silver, and copper. After that we need to adjust the copper to be less than
    # 100 and the silver to be less than 100. This part works the same as in calculate_price()
    pass
    return (gold, silver, copper)

def write_receipt(cart, path):
    """
    Write a reciept file.

    @type cart: dict
    @param cart: The user's cart as a dictionary. Each dictionary value is another dictionary with keys "item" and
                 "quantity".
    @type path: str|pathlib.Path
    @param path: The path to the file to write.
    """
    # Here we need to open a file for writing in text mode. Then we need to write one line for every item in the user's
    # cart that has a quantity of at least 1. Finally, we need to write the total. Once we're done writing we
    # must close the file! Here we can use calculate_price(), and calculate_total() to help us.
    pass

def bind_scale_command(scale, item, quantityvar, costvar, totalvar, cart):
    """
    Bind an event command to a Scale widget. This is a utility function.

    @type scale: tk.Scale|ttk.Scale
    @param scale: A scale widget to bind an event for.
    @type item: ShopItem
    @param item: The ShopItem corresponding to the Scale widget.
    @type quantityvar: tk.StringVar
    @param quantityvar: A mutable string variable that the command will set.
    @type costvar: tk.StringVar
    @param costvar: A mutable string variable that the command will set.
    @type totalvar: tk.StringVar
    @param totalvar: A mutable string variable that the command will set.
    @type cart: dict
    @param cart: The user's cart as a dictionary. Each dictionary value is another dictionary with keys "item" and
                 "quantity".
    """
    scale.configure(command=lambda ev: update_item_cost_and_quantity(item, scale, quantityvar, costvar, totalvar, cart))

def update_item_cost_and_quantity(item, scale, quantityvar, costvar, totalvar, cart):
    """
    A command function that triggers the calculation of subtotals and totals.

    @type item: ShopItem
    @param item: The ShopItem corresponding to the Scale widget.
    @type quantityvar: tk.StringVar
    @param quantityvar: A mutable string variable that the command will set.
    @type costvar: tk.StringVar
    @param costvar: A mutable string variable that the command will set.
    @type totalvar: tk.StringVar
    @param totalvar: A mutable string variable that the command will set.
    @type cart: dict
    @param cart: The user's cart as a dictionary. Each dictionary value is another dictionary with keys "item" and
                 "quantity".
    """
    cart[item.name()]["quantity"] = int(scale.get())
    quantityvar.set("x" + str(cart[item.name()]["quantity"]))
    gold, silver, copper = calculate_price(cart, item)
    costvar.set(str(gold) + "g " + str(silver) + "s " + str(copper) + "c")
    gold, silver, copper = calculate_total(cart)
    totalvar.set(str(gold) + "g " + str(silver) + "s " + str(copper) + "c")

def save_receipt(cart):
    """
    A command function that triggers the saving of a receipt file.

    @type cart: dict
    @param cart: The user's cart as a dictionary. Each dictionary value is another dictionary with keys "item" and
                 "quantity".
    """
    path = filedialog.asksaveasfilename()
    if path is not None:
        write_receipt(cart, path)

items = (ShopItem("Alterac Swiss", 0, 40, 0), ShopItem("Dalaran Sharp", 0, 1, 25),
         ShopItem("Darnassian Bleu", 0, 0, 25), ShopItem("Dwarven Mild", 0, 5, 0),
         ShopItem("Fine Aged Cheddar", 0, 20, 0), ShopItem("Ice Cold Milk", 0, 1, 25),
         ShopItem("Melon Juice", 0, 5, 0), ShopItem("Moonberry Juice", 0, 20, 0),
         ShopItem("Morning Glory Dew", 0, 40, 0), ShopItem("Refreshing Spring Water", 0, 0, 25),
         ShopItem("Stormwind Brie", 0, 10, 0), ShopItem("Sweet Nectar", 0, 10, 0))
cart = { }
for item in items:
    cart[item.name()] = { "item": item, "quantity": 0 }
root = tk.Tk()
root.title("Cheese Shop")
root.resizable(width=False, height=False)
shop_label = ttk.Label(root, text="Welcome to my shop!")
shop_label.pack()
inner_frame = ttk.Frame(root)
inner_frame.pack(padx=5, pady=5)
shop_frame = ttk.LabelFrame(inner_frame, text="Shop")
shop_frame.grid(row=0, column=0, sticky=tk.N)
ttk.Separator(inner_frame, orient=tk.VERTICAL).grid(padx=10, row=0, column=1)
receipt_frame = ttk.LabelFrame(inner_frame, text="Receipt")
receipt_frame.grid(row=0, column=2, sticky=tk.N)
totalvar = tk.StringVar(receipt_frame, "0g 0s 0c")
for i, item in enumerate(items):
    label = ttk.Label(shop_frame, text=str(item))
    label.grid(row=i, column=0, padx=10, pady=1)
    scale = ttk.Scale(shop_frame, from_=0, to=255, value=0)
    scale.grid(row=i, column=1)
    quantityvar = tk.StringVar(receipt_frame, "x0")
    label = ttk.Label(receipt_frame, textvariable=quantityvar, width=4)
    label.grid(row=i, column=0, padx=10, pady=1)
    costvar = tk.StringVar(receipt_frame, "0g 0s 0c")
    label = ttk.Label(receipt_frame, textvariable=costvar, width=12)
    label.grid(row=i, column=1, padx=20)
    bind_scale_command(scale, item, quantityvar, costvar, totalvar, cart)
total_label = ttk.Label(receipt_frame, text="Total")
total_label.grid(row=len(items), column=0)
total_label = ttk.Label(receipt_frame, textvariable=totalvar, width=12)
total_label.grid(row=len(items), column=1)
save_button = ttk.Button(inner_frame, text="Save Reciept", command=lambda: save_receipt(cart))
save_button.grid(row=1, column=2, pady=10, sticky=tk.E)
root.mainloop()
