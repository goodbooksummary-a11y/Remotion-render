# 🚀 Yeni Render Worker Hesabı Ekleme Adımları (1 Dakika)

Senin yapman gereken tek şey:

1. **Yeni GitHub hesabını aç** (ve o hesapla giriş yap).
2. **Token oluşturmak için doğrudan şu linke tıkla:**  
   👉 [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new) *(Personal Access Tokens - Classic)*
3. **Note (İsim):** `remotion-render` yaz.
4. **Expiration (Süre):** İstediğin süreyi (veya *No expiration*) seç.
5. **Kutucuklardan sadece şunları işaretle:**
   - [x] **`repo`** *(Full control of private repositories - Repo açmak ve push için)*
   - [x] **`workflow`** *(Update GitHub Action workflows - Actions işlerini yönetmek için)*
6. **En alttaki yeşil "Generate token" butonuna bas.**
7. **Çıkan `ghp_xxxxxxxxxxxxxxxxxxxx` kodunu ve hesabın e-postasını kopyalayıp buraya ilet.**

---

> 🤖 **Kalan Tüm İşlemleri Agent Otomatik Yapar:**
> Token ve e-postayı ilettiğin anda:
> - Yeni repo açma (`<username>/Remotion-render`)
> - Kod tabanı ve büyük medya varlıklarının senkronizasyonu (`god-mode` dalı)
> - Actions workflow'unun aktifleştirilmesi
> - `render-accounts.json` ve otomatik round-robin havuzuna eklenmesi
> tamamen arka planda otomatik olarak tamamlanır.
