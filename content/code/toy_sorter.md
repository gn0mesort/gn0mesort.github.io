---
title: Toy Sorter
description: ""
summary: "A toy sorting application similar to many common computer programming homework assignments."
date: 2024-03-16T11:16:10-07:00
publishdate: 2024-03-16T11:16:10-07:00
toc: false
highlighter: true
showdates: false
nolist: true
---

This is a simplistic application that a student might write for an assignment in an introductory programming course.

```cpp
#include <cstdlib>

#include <vector>
#include <iostream>

using namespace std;

void randomize(vector<int>& arr);
void print_arr(vector<int>& arr);
void gnomesort(vector<int>& arr);
void quicksort(vector<int>& arr);

int main() {
  srand(time(nullptr));
  vector<int> arr;
  bool quit = false;
  while (!quit)
  {
    cout << "Choose an option: " << endl;
    cout << "0 Quit" << endl;
    cout << "1 Randomize Array" << endl;
    cout << "2 Sort Array with Gnomesort" << endl;
    cout << "3 Sort Array with Quicksort" << endl;
    cout << "> ";
    int choice = 0;
    cin >> choice;
    switch (choice)
    {
    case 0:
      quit = true;
      break;
    case 1:
      randomize(arr);
      print_arr(arr);
      break;
    case 2:
      gnomesort(arr);
      print_arr(arr);
      break;
    case 3:
      quicksort(arr);
      print_arr(arr);
      break;
    default:
      break;
    }
  }
  return 0;
}

void randomize(vector<int>& arr) {
  arr.clear();
  for (int i = 0; i < 25; i++)
  {
    arr.push_back(rand() % 100);
  }
}

void print_arr(vector<int>& arr) {
  for (int i = 0; i < arr.size(); i++)
  {
    cout << arr[i];
    if (i + 1 < arr.size())
    {
      cout << ", ";
    }
  }
  cout << endl;
}

void swap(vector<int>& arr, int a, int b) {
  if (arr[a] == arr[b])
  {
    return;
  }
  arr[a] = arr[a] ^ arr[b];
  arr[b] = arr[a] ^ arr[b];
  arr[a] = arr[a] ^ arr[b];
}

void gnomesort(vector<int>& arr) {
  int pos = 0;
  while (pos < arr.size())
  {
    if (!pos || arr[pos] >= arr[pos - 1])
    {
      pos++;
    }
    else
    {
      swap(arr, pos, pos -1);
      pos--;
    }
  }
}

int quicksort_partition(vector<int>& arr, int begin, int end) {
  int x = arr[end - 1];
  int i = begin - 1;
  for (int j = begin; j < end - 1; j++)
  {
    if (arr[j] <= x)
    {
      i++;
      swap(arr, i, j);
    }
  }
  i++;
  swap(arr, i, end - 1);
  return i;
}

void quicksort_implementation(vector<int>& arr, int begin, int end) {
  if (begin >= end)
  {
    return;
  }
  int p = quicksort_partition(arr, begin, end);
  quicksort_implementation(arr, begin, p);
  quicksort_implementation(arr, p + 1, end);
}

void quicksort(vector<int>& arr) {
  quicksort_implementation(arr, 0, arr.size());
}
```
