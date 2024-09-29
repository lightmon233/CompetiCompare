CC = g++
OUTPUTS = input_generator$(EXE) code1$(EXE) code2$(EXE) compare$(EXE)
SOURCES = input_generator.cpp code1.cpp code2.cpp compare.cpp
INPUT_FILE = input.txt
OUTPUT1 = output1.txt
OUTPUT2 = output2.txt

ifeq ($(OS),Windows_NT)
	RM = del
	EXE = .exe
	SLASH = \\
else
	RM = rm -f
	EXE = 
	SLASH = /
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

run:
	.$(SLASH)input_generator$(EXE) && .$(SLASH)code1$(EXE) < $(INPUT_FILE) > $(OUTPUT1) && .$(SLASH)code2$(EXE) < $(INPUT_FILE) > $(OUTPUT2) && .$(SLASH)compare$(EXE)

clean:
	$(RM) $(OUTPUTS)


