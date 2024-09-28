#include <iostream>
#include <random>
#include <fstream>

using namespace std;

mt19937_64 rnd(1064);
int rd(int l, int r) {return rnd() % (r - l + 1) + l;}

string s[10];

void solve() {
    ofstream output;
    output.open("input.txt");
    int t = 5000;
    output << t << '\n';
    while (t --) {
        int n = 10;
        int m = rd(0, 10);
        output << n << ' ' << m << '\n';
        for (int i = 1; i <= n; i ++) {
            output << rd(1, 10) << ' ';
        }
        output << '\n';
    }
}

int main() {
    solve();
    return 0;
}