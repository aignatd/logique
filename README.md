# backend-ignat-deswanto

A. Persiapan
	 1. Cek file yang dibutuhkan didalam folder utils
	 2. Lakukan import 2 file json kedalam postman yaitu logique.postman_collection.json dan logique.postman_environment.json
	 3. Collection postman bernama Logique dan Environmentnya bernama Logique
	 4. Lakukan import 1 file sql kedalam database MySQL yaitu books.sql
	 5. Untuk password database silakan digunakan untuk melihat tabel book
	 
B. API Token
	 1. Generate token menggunakan API /auth/token
	 2. Dapat menggunakan postman dibagian Auth - Generate Token
	 3. Token yang terbentuk akan otomatis disimpan di environment Logique
	 4. Token mempunyai masa aktif atau masa berlaku
	 	 
C. API Books
	 1. Untuk mengakses semua API customer dibutuhkan token
	 2. Generate token terlebih (lihat langkah B)
	 3. Semua API dapat dilihat menggunakan postman di bagian Books
	 4. API Books terdiri dari beberapa request seperti search book, list book, delete book, update book, get book dan create book
