# 📢 Student Announcements Website

This is a **static website** hosted on (https://vercel.com).
It displays important student announcements (circulars, boot kit, counsellor details, venues, club showcasing, etc.) as clickable links that redirect or download files from Google Drive.

---

## 🚀 How it Works

* All announcements are stored inside **`data.js`** in an array called `ANNOUNCEMENTS`.
* When you update the array and push changes to GitHub, vercel.com **automatically redeploys** the site with the new announcements.
* No database is needed. Everything is **hardcoded + version controlled**.

---

## 🛠️ Steps to Modify Announcements

1. **Clone the Repository**

   ```bash
   git clone <repo-link>
   cd <repo-name>
   ```

2. **Open the `data.js` File**

   * The file looks like this:

     ```javascript
     const ANNOUNCEMENTS = [
       {
         title: "Circular - Exam Timetable",
         link: "https://drive.google.com/file/d/xyz/view?usp=sharing"
       },
       {
         title: "Bootkit Workshop",
         link: "https://drive.google.com/file/d/abc/view?usp=sharing"
       }
     ];
     ```
   * Each announcement is an **object** with:

     * `title` → the display name
     * `link` → Google Drive file link

3. **Add / Edit Announcements**

   * To add a new one, just append to the array:

     ```javascript
     {
       title: "New Event: Tech Fest",
       link: "https://drive.google.com/file/d/123/view?usp=sharing"
     }
     ```

4. **Commit & Push**

   ```bash
   git add .
   git commit -m "Updated announcements"
   git push origin main
   ```

5. **Auto Deployment**

   * Once pushed, vercel.com will auto-redeploy.
   * Within a few seconds, the live site updates with the new announcements.

---

## 🧑‍💻 Notes

* Ensure every Google Drive link has **“Anyone with link can view”** enabled.
* Don’t remove the `const ANNOUNCEMENTS = [...]` format, otherwise the site will break.
* Best practice: Always test the link before pushing.

---

## 📦 Tech Stack

* HTML, CSS, JavaScript
* Hosted on https://vercel.com (Static Deployment)
* Google Drive links as source files

---

## 🔧 Quick Fix if Deployment Fails

* Run `git pull` before editing (to avoid conflicts).
* Ensure `vercel.json` is present at the root.
* If `data.js` has a missing `,` or `}`, deployment will fail — double check.

---

✍️ Maintainer: VTG56
