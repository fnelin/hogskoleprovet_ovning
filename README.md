# ⭐ Practice 
A small application in preperation for a high school test that turned into exploration about coding with AI (Claude).
Preperation question stored in json files presented as either flashcard or string of user defined series of questions.

## 📋 Project information
A typescript/nextjs project with as few components as possible. Tailwind added for quicker formatting.
Heavy use of Claude AI with manual code reviews and refactors. So far no keys or secrets in .env.

### 🧩 Adding subjects
The questions are managed in two json files.
- Subjects.json
  - Here we define which categories/subjects of questions will be shown on the frontpage.   
    Each subject has a three to four letter SLUG which is used as naming convention for each file containing questions
- [slug].json
  - Files with questions, answer and explanation. Each file is named with a [SLUG] in order to map it to a category/subject.

### 🔖 Wishlist
- [ ] Userprofiles with progress charts
- [ ] Larger set of questions for each category
- [ ] Move to PostgreSQL instead of jsonfiles
- [ ] Moc tests with answersheets and final evaluation
- [ ] Combine questions from several categories
- [ ] Difficulty levels for questions
- [ ] Links for deeper dive into (read more here->) explanations for each question
- [ ] Proper settings and sliders per user profile. Set levels and subjects to focus on etc.

> [!NOTE]
> 🚧 **About** 🚧 <br>
> This is a sporadic project with focus on having a working application instead of testing the limits of new technology. As such updates will be sporadic and focused towards when the tests draw closer.
