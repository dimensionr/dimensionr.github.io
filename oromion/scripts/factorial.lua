-- definiendo la función factorial
function fact(n)
	if n==0 then
		return 1
	else
		return n * fact(n - 1)
	end
end

print("ingrese un número:")
a = io.read("*n")					-- lee un número
print(fact(a))