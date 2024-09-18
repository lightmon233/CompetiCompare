#include <iostream>
#include <fstream>
#include <cstdlib>

// 定义两种不同的算法
int algorithm1(int x) {
    return x * x;
}

int algorithm2(int x) {
    return x * x;
}

// 输入生成器
void generate_input(std::ofstream& infile) {
    int test_cases = 10;  // 生成10个测试用例
    infile << test_cases << std::endl;
    for (int i = 0; i < test_cases; ++i) {
        infile << rand() % 100 << std::endl;
    }
}

// 比较两个算法的输出
int main() {
    std::ofstream infile("input.txt");
    generate_input(infile);
    infile.close();

    std::ifstream infile2("input.txt");
    int test_cases;
    infile2 >> test_cases;

    bool is_same = true;
    for (int i = 0; i < test_cases; ++i) {
        int x;
        infile2 >> x;
        int result1 = algorithm1(x);
        int result2 = algorithm2(x);
        if (result1 != result2) {
            std::cout << "Difference found at test case " << i << ": " << result1 << " vs " << result2 << std::endl;
            is_same = false;
            break;
        }
    }
    
    if (is_same) {
        std::cout << "All test cases passed!" << std::endl;
    }

    return 0;
}
