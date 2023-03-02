# GDB

### Essentials
```
help                            - List commands
break *<addr>                   - Set a breakpoint at <addr>  
s/n                             - Source-level step/next
si/ni                           - Instruction-level step/next
finish                          - Continue until function return  
run                             - Run binary  
continue                        - Continue execution  
info break                      - List set breakpoints  
info register                   - List out registers
disassemble <function>          - List out assembly instructions of function
backtrace                       - List out function callstack
start                           - Set breakpoint at the main function and run
maintenance info sections       - List all currently mapped sections
```

### Printing
```
print /<format> <addr>          - Print out data at an address  
x/<num><format><size> <addr>    - Print out <num> values of the given format/size at <addr>  

The difference between 'print' and 'x' is that 'x' dereferences the address before printing
    example usage: x/4xw 0x123  - Print out 4 hexadecimal words at 0x123

Common Formats:
    x - hex
    d - decimal
    f - float
    s - string
    i - instruction

Common Sizes:
    b - byte
    h - halfword
    w - word
    g - double-word
```

### PwnDBG extension
Docs: https://browserpwndbg.readthedocs.io/en/docs/
```
vmmap                           - Print out virtual memory listing
vis                             - Print out listing of current heap view
bins                            - Print out all heap-allocator bins
top_chunk                       - Print out top-chunk
```

# Pwntools

Docs: https://docs.pwntools.com/en/stable/

### Template
```py
from pwn import *

elf = context.binary = ELF('./vuln')
libc = elf.libc
p = elf.process()

if args.GDB:
    gdb.attach(p, gdbscript=f'''
        continue
    ''')

p.interactive()
```

### Commonly used functions
```
p.send(data)                    - Send data to process's stdin
p.sendline(data)                - Send data + a newline to process's stdin
p.recvline()                    - Receive a line from process' stdout
p.recvuntil('AAA')              - Receve bytes from process' stdout until 'AAA' is encountered
p.clean()                       - Read in all data from process' stdout
p64(<addr>)                     - Packs the integer <addr> into a little-endian buffer
u64(<buf>)                      - Unpacks the bytes from <buf> into an integer
puts_plt = elf.plt['puts']      - Retrieve address of plt-puts from binary
puts_got = elf.got['puts']      - Retrieve address of got-puts from binary
system = libc.symbols['system']             - Retrieve address of system() function from libc
binsh = next(libc.search(b'/bin/sh\x00'))   - Retrieve address of '/bin/sh\0' string from libc
```
