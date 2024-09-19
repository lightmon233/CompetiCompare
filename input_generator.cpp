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
        int n = 5, m = 10;
        output << n << ' ' << m << '\n';
        for (int i = 0; i < n; i ++) {
            string tmp = "";
            for (int j = 0; j < m; j ++) {
                tmp += (rd(0, 25) + 'a');
            }
            output << tmp << '\n';
        }
    }
}

int main() {
    solve();
    return 0;
}