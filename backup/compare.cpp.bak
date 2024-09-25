#include <fstream>
#include <iostream>

using namespace std;

void solve() {
    ifstream input1;
    // 你的代码运行的输出
    input1.open("output1.txt");
    ifstream input2;
    // 正确的代码的输出
    input2.open("output2.txt");
    int n = 5, m = 10;
    int T = 5000;
    for (int i = 1; i <= T; i ++) {
        int x, y;
        input1 >> x;
        input2 >> y;
        if (x == y) {
            cout << "test" << i << " true\n";
        }
        else {
            cout << "test" << i << " false\n";
            break;
        }
    }
}

int main() {
    solve();
    return 0;
}