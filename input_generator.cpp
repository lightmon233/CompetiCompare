#include <iostream>
#include <fstream>
#include <cstdlib>
#include <ctime>

// 输入生成器，生成一定数量的随机数输入
void generate_input() {
    std::ofstream infile("input.txt");

    int test_cases = 10; // 生成10个测试用例
    infile << test_cases << std::endl;

    std::srand(std::time(nullptr)); // 使用当前时间作为随机种子
    for (int i = 0; i < test_cases; ++i) {
        int random_number = std::rand() % 1000; // 生成0到999之间的随机数
        infile << random_number << std::endl;
    }

    infile.close();
}

int main() {
    generate_input();  // 调用输入生成器
    std::cout << "Test input generated in input.txt" << std::endl;
    return 0;
}