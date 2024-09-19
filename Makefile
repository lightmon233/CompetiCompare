compare.exe: code1.obj code2.obj input_generator.obj compare.obj
    g++ -o compare code1.obj code2.obj input_generator.obj compare.obj

code1.obj: code1.cpp
    g++ -c code1.cpp

code2.obj: code2.cpp
    g++ -c code2.cpp

input_generator.obj: input_generator.cpp
    g++ -c input_generator.cpp

compare.obj:
    g++ -c compare.cpp

clean:
    rm compare.exe code1.obj code2.obj input_generator.obj compare.obj