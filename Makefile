# all:
# 	g++ -o input_generator.exe input_generator.cpp \
# 	&& .\input_generator.exe \
# 	&& g++ -o code1.exe code1.cpp \
# 	&& .\code1.exe < input.txt > output1.txt\
# 	&& g++ -o code2.exe code2.cpp \
# 	&& .\code2.exe < input.txt > output2.txt\
# 	&& g++ -o compare.exe compare.cpp \
CC = g++
CC = g++
OUTPUTS = input_generator$(EXE) code1$(EXE) code2$(EXE) compare$(EXE)
SOURCES = input_generator.cpp code1.cpp code2.cpp compare.cpp
INPUT_FILE = input.txt
OUTPUT1 = output1.txt
OUTPUT2 = output2.txt

ifeq ($(OS),Windows_NT)
    RM = del
    EXE = .exe
else
    RM = rm -f
    EXE = 
endif

all: $(OUTPUTS)

input_generator$(EXE): input_generator.cpp
	$(CC) -o $@ $<

code1$(EXE): code1.cpp
	$(CC) -o $@ $<

code2$(EXE): code2.cpp
	$(CC) -o $@ $<

compare$(EXE): compare.cpp
	$(CC) -o $@ $<

run: input_generator$(EXE)
	./input_generator$(EXE) && ./code1$(EXE) < $(INPUT_FILE) > $(OUTPUT1) && ./code2$(EXE) < $(INPUT_FILE) > $(OUTPUT2) && ./compare$(EXE)

clean:
	$(RM) $(OUTPUTS)


