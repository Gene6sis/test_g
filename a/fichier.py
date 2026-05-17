def f(texte: str) -> str | None:
	r = {}
	s = None
	m = 0
	for i in range(len(texte) - 2):
		substring = texte[i:i+3]
		r[substring] = 1 + r.get(substring, 0)
		if (m < r[substring]):
			m = r[substring]
			s = substring
	return s
	

print(f("AB"))