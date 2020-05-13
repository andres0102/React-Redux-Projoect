import React from 'react';
import PersonalityQuestions from './personality_questions'

export default function PersonalityIndex() {
  return(
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 bg-white p-4">
          <h1 className="text-center">
            Τέστ 16 Προσωπικοτήτων
          </h1>
          <p className="text-center">
            Κάντε το παρακάτω τέστ και μοιραστείτε κομμάτι της προσωπικοτητάς σας
          </p>
          <hr />
          <div className="alert alert-info text-center">
            <small>
              Για κάθε ερώτηση επιλέξτε μία απο τις δύο απαντήσεις, αν δεν σας ταιριάζει καμία απάντηση,
              επιλέξτε αυτή που σας ταιριάζει περισσότερο. Δεν υπάρχουν σωστές ή λάθος απαντήσεις, απλά απαντήστε όπως πιστεύετε.
              Το αποτέλεσμα θα καταγραφεί στο προφίλ σας, όπου όλοι οι χρήστες θα έχουν το δικαίωμα να το διαβάσουν.
            </small>
          </div>
          <PersonalityQuestions />
      </div>
    </div>
  </div>
  );
}
