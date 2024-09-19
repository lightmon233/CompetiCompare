#include <iostream>
#include <random>
#include <fstream>

using namespace std;

mt19937_64 rnd(1064);
int rd(int l, int r) {return rnd() % (r - l + 1) + l;}

string s[10];

void solve() {
    ofstream output1;
    output1.open("../my/input.txt");
    ofstream output2;
    output2.open("../cor/input.txt");
    int t = 5000;
    output1 << t << '\n';
    output2 << t << '\n';
    while (t --) {
        int n = 5, m = 10;
        output1 << n << ' ' << m << '\n';
        output2 << n << ' ' << m << '\n';
        for (int i = 0; i < n; i ++) {
            string tmp = "";
            for (int j = 0; j < m; j ++) {
                tmp += (rd(0, 25) + 'a');
            }
            output1 << tmp << '\n';
            output2 << tmp << '\n';
        }
    }
}

int main() {
    solve();
    return 0;
}