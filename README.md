# 📚 Full Stack Aplikacija – PHP, MySQL & Angular

Ova aplikacija je **full stack projekat** razvijen koristeći **PHP i MySQL** za backend, te **Angular** za frontend.

---

## 🚀 Funkcionalnosti

Aplikacija podržava dvije vrste korisnika:

### 👨‍💼 Admin
- Admin korisnik je **direktno unesen u bazu** (nije moguće kreirati novog admina putem interfejsa).
- Trenutno podešeni admin podaci:
  - **Username:** `admin`
  - **Lozinka:** `admin123`
- Admin ima mogućnost da:
  - Objavljuje nove vijesti/novosti 📰  
  - Uređuje postojeće vijesti ✏️  
  - Briše vijesti ❌  
  - Odobrava nove korisnike nakon registracije ✅  

### 👤 Standardni korisnik (User)
- Registruje se putem forme na frontend dijelu aplikacije.
- Nakon registracije **čeka odobrenje admina**.
- Kada ga admin odobri, može se prijaviti koristeći korisničko ime i lozinku.
- User ima mogućnost samo **pregleda vijesti** (read-only pristup).

---

## 🧩 Tehnički detalji

### 📦 Backend (PHP + MySQL)
- Implementiran je **CRUD sistem**:
  - Kreiranje
  - Čitanje
  - Ažuriranje (Update)
  - Brisanje
- Podaci o vijestima se čitaju iz baze putem GET endpointa u PHP-u.
- U bazi je ručno uneseno **20 zapisa** u tabelu `vijesti` (top knjige).

### 💻 Frontend (Angular)
- Prikazuje vijesti koje dolaze iz baze.
- Omogućava prijavu, registraciju i osnovnu interakciju korisnika.

---

## ⚙️ Pokretanje projekta

### 🔹 Backend (PHP)
1. Smjesti projekat unutar **`htdocs`** foldera (npr. `C:\xampp\htdocs\WP_1_Medina_Mustacevic`).
2. Pokreni **XAMPP** i startaj:
   - **Apache**
   - **MySQL**
3. Uvezi bazu podataka:
   - Datoteka: `vijesti.sql`
   - U phpMyAdmin-u napravi novu bazu (npr. `vijesti`) i **importuj** `vijesti.sql`.

### 🔹 Frontend (Angular)
1. Otvori terminal u folderu `client`.
2. Instaliraj potrebne pakete:
   ```bash
   npm i
nakon toga, ng serve --open
