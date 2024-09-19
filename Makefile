all:
	g++ -o input_generator.exe input_generator.cpp \
	&& .\input_generator.exe \
	&& g++ -o code1.exe code1.cpp \
	&& .\code1.exe < input.txt > output1.txt\
	&& g++ -o code2.exe code2.cpp \
	&& .\code2.exe < input.txt > output2.txt\
	&& g++ -o compare.exe compare.cpp \