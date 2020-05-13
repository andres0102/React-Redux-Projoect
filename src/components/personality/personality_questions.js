import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postPersonalityResults } from '../../redux/actions/personality';

class PersonalityQuestions extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    let formPayload = new FormData(event.target);

    this.props.postPersonalityResults(formPayload)
  }

  render() {
    return(
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-9 col-sm-12">
          <form onSubmit={this.handleSubmit}>
            <ol className="list-group">
              <div className="form-group">
                <li>
                  <h4 className="orange-text">Προτιμώ</h4>
                </li>
                <div className="inputGroup">
                  <input name="1" id="1_a" value="a" type="radio" />
                  <label htmlFor="1_a">
                    <div className="col-11">
                      Να λύνω νέα περίπλοκα προβλήματα
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="1" id="1_b" value="b" type="radio" />
                  <label htmlFor="1_b">
                    <div className="col-11">
                      Να δουλέυω πάνω σε κάτι που ήδη ξέρω
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Μου αρέσει</h4>
                </li>
                <div className="inputGroup">
                  <input name="2" id="2_a" value="a" type="radio" />
                  <label htmlFor="2_a">
                    <div className="col-11">
                      Να δουλεύω μόνος/η σε ήσυχο μέρος
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="2" id="2_b" value="b" type="radio" />
                  <label htmlFor="2_b">
                    <div className="col-11">
                      Να βρίσκομαι μέσα στη δράση
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Θέλω να είμαι αφεντικό</h4>
                </li>
                <div className="inputGroup">
                  <input name="3" id="3_a" value="a" type="radio" />
                  <label htmlFor="3_a">
                    <div className="col-11">
                      Που εφαρμόζει όρους και προϋποθέσεις ανεξαρτήτως ατόμου
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="3" id="3_b" value="b" type="radio" />
                  <label htmlFor="3_b">
                    <div className="col-11">
                      Που λαμβάνει υπ όψιν προσωπικά προβλήματα και κάνει εξαιρέσεις
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Όταν δουλεύω πάνω σε κάτι</h4>
                </li>
                <div className="inputGroup">
                  <input name="4" id="4_a" value="a" type="radio" />
                  <label htmlFor="4_a">
                    <div className="col-11">
                      Θέλω να το τελειώσω
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="4" id="4_b" value="b" type="radio" />
                  <label htmlFor="4_b">
                    <div className="col-11">
                      Το αφήνω μισο-τελειωμένο για τυχόν αλλαγές
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Όταν παίρνω αποφάσεις, το σημαντικότερο είναι να...
                  </h4>
                </li>
                <div className="inputGroup">
                  <input name="5" id="5_a" value="a" type="radio" />
                  <label htmlFor="5_a">
                    <div className="col-11">
                      Έιναι λογικές και τεκμηριομένες
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="5" id="5_b" value="b" type="radio" />
                  <label htmlFor="5_b">
                    <div className="col-11">
                      Σκεφτώ αν πληγώσω κάποιον/α πρώτα
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Για να λύσω ένα νέο θέμα, συνήθως</h4>
                </li>
                <div className="inputGroup">
                  <input name="6" id="6_a" value="a" type="radio" />
                  <label htmlFor="6_a">
                    <div className="col-11">
                      Το σκέφτομαι συνέχεια και σχεδιάζω πριν προχωρήσω
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="6" id="6_b" value="b" type="radio" />
                  <label htmlFor="6_b">
                    <div className="col-11">
                      Ξεκινάω κατ ευθείαν και σκέφτομαι καθώς το λύνω
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Για την επίλυση προβλήματος, προτιμώ
                  </h4>
                </li>
                <div className="inputGroup">
                  <input name="7" id="7_a" value="a" type="radio" />
                  <label htmlFor="7_a">
                    <div className="col-11">
                      Να χρησιμοποιώ μεθόδους που έχουν δουλέψει στο παρελθόν
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="7" id="7_b" value="b" type="radio" />
                  <label htmlFor="7_b">
                    <div className="col-11">
                      Να δοκιμάζω καινούριες μεθόδους
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Στην δουλειά μου, προτιμώ</h4>
                </li>
                <div className="inputGroup">
                  <input name="8" id="8_a" value="a" type="radio" />
                  <label htmlFor="8_a">
                    <div className="col-11">
                      Να δουλεύω πάνω σε πολλά πράγματα, μαθαίνοντας όσα πιο πολλά μπορώ
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="8" id="8_b" value="b" type="radio" />
                  <label htmlFor="8_b">
                    <div className="col-11">
                      Να δουλεύω πάνω σε ένα συγκεκριμένο αντικείμενο που με κρατάει απασχολημένο
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Συνήθως</h4>
                </li>
                <div className="inputGroup">
                  <input name="9" id="9_a" value="a" type="radio" />
                  <label htmlFor="9_a">
                    <div className="col-11">
                      Προσχεδιάζω όταν θέλω να κάνω κάτι, και με ενοχλεί όταν αλλάζουν τα πλάνα μου
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="9" id="9_b" value="b" type="radio" />
                  <label htmlFor="9_b">
                    <div className="col-11">
                      Αποφεύγω τα σχέδια, αφήνω τα πράγματα όπως έρθουν
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Όταν συζητάω γιά ένα πρόβλημα με κάποιον, μου είναι εύκολο
                  </h4>
                </li>
                <div className="inputGroup">
                  <input name="10" id="10_a" value="a" type="radio" />
                  <label htmlFor="10_a">
                    <div className="col-11">
                      Να καταλάβω τη γενική εικόνα του θέματος
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="10" id="10_b" value="b" type="radio" />
                  <label htmlFor="10_b">
                    <div className="col-11">
                      Να καταλάβω όλες τις λεπτομέρειες του θέματος
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Όταν με καλούν στο σπίτι ή στη δουλειά, συνήθως
                  </h4>
                </li>
                <div className="inputGroup">
                  <input name="11" id="11_a" value="a" type="radio" />
                  <label htmlFor="11_a">
                    <div className="col-11">
                      Το θεωρώ σαν ενόχληση
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="11" id="11_b" value="b" type="radio" />
                  <label htmlFor="11_b">
                    <div className="col-11">
                      Δεν με ενοχλεί να απαντήσω
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Ποιά λέξη σε περιγράφει περισσότερο
                  </h4>
                </li>
                <div className="inputGroup">
                  <input name="12" id="12_a" value="a" type="radio" />
                  <label htmlFor="12_a">
                    <div className="col-11">
                      Αναλυτικός/ή
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="12" id="12_b" value="b" type="radio" />
                  <label htmlFor="12_b">
                    <div className="col-11">
                      Ενθουσιώδης
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Όταν έχω μια εργασία να τελειώσω, προτιμώ
                  </h4>
                </li>
                <div className="inputGroup">
                  <input name="13" id="13_a" value="a" type="radio" />
                  <label htmlFor="13_a">
                    <div className="col-11">
                      Να την κάνω σταθερά και με συνέπεια
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="13" id="13_b" value="b" type="radio" />
                  <label htmlFor="13_b">
                  <div className="col-11">
                  Να δουλεύω με πολύ ενέργεια με αρκετά διαλείμματα
                  </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Όταν συζητάω με κάποιον για κάποιο θέμα, προσπαθώ
                  </h4>
                </li>
                <div className="inputGroup">
                  <input name="14" id="14_a" value="a" type="radio" />
                  <label htmlFor="14_a">
                    <div className="col-11">
                      Να καταλάβω βάση των προσωπικών μου εμπειριών
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="14" id="14_b" value="b" type="radio" />
                  <label htmlFor="14_b">
                    <div className="col-11">
                      Να καταλάβω αναλύοντας με ανοιχτό μυαλό
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Όταν μου έρχεται μια ιδέα</h4>
                </li>
                <div className="inputGroup">
                  <input name="15" id="15_a" value="a" type="radio" />
                  <label htmlFor="15_a">
                    <div className="col-11">
                      Απλά την κάνω πράξη
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="15" id="15_b" value="b" type="radio" />
                  <label htmlFor="15_b">
                    <div className="col-11">
                      Προτιμώ να την αναλύσω πιο πολύ πρωτού ενεργήσω
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Όταν δουλεύω πάνω σε κάτι, προτιμώ
                  </h4>
                </li>
                <div className="inputGroup">
                  <input name="16" id="16_a" value="a" type="radio" />
                  <label htmlFor="16_a">
                    <div className="col-11">
                      Σχεδιάζω 'κλειστά' ώστε ο τελικός στόχος να είναι καθαρός
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="16" id="16_b" value="b" type="radio" />
                  <label htmlFor="16_b">
                    <div className="col-11">
                      Σχεδιάζω 'ανοιχτά' ώστε να μπορώ να προσθέσω πράγματα αν χρειαστεί
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Όταν διαβάζω κάτι, συνήθως</h4>
                </li>
                <div className="inputGroup">
                  <input name="17" id="17_a" value="a" type="radio" />
                  <label htmlFor="17_a">
                    <div className="col-11">
                      Είμαι συγκεντρωμένος/η σε αυτό που διαβάζω και δεν αποσπάται η προσοχή μου
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="17" id="17_b" value="b" type="radio" />
                  <label htmlFor="17_b">
                    <div className="col-11">
                      Λέξεις και προτάσεις μου δημιουργούν ιδέες και φαντασίες
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Όταν πρέπει να πάρω μια απόφαση στα γρήγορα, συνήθως
                  </h4>
                </li>
                <div className="inputGroup">
                  <input name="18" id="18_a" value="a" type="radio" />
                  <label htmlFor="18_a">
                    <div className="col-11">
                      Δεν νιώθω άνετα και θα προτιμούσα να είχα περισσότερο χρόνο
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="18" id="18_b" value="b" type="radio" />
                  <label htmlFor="18_b">
                    <div className="col-11">
                      Δεν έχω πρόβλημα με γρήγορες αποφάσεις
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Σε μία συνάντηση με πολλούς ανθρώπους</h4>
                </li>
                <div className="inputGroup">
                  <input name="19" id="19_a" value="a" type="radio" />
                  <label htmlFor="19_a">
                    <div className="col-11">
                      Μιλάω άνετα με όλους και δεν σκέφτομαι ιδιαίτερα το τι θα πώ
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="19" id="19_b" value="b" type="radio" />
                  <label htmlFor="19_b">
                    <div className="col-11">
                      Πριν μιλήσω σκέφτομαι καλά το τι θα πώ
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Στη δουλειά, προτιμώ να αφιερώνω το χρόνο μου σε θέματα που αφορούν
                  </h4>
                </li>
                <div className="inputGroup">
                  <input name="20" id="20_a" value="a" type="radio" />
                  <label htmlFor="20_a">
                    <div className="col-11">
                      Νέες ιδέες
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="20" id="20_b" value="b" type="radio" />
                  <label htmlFor="20_b">
                    <div className="col-11">
                      Άλλους ανθρώπους
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Όταν με συμβουλεύουν, με ενοχλεί πιο πολύ οταν
                  </h4>
                </li>
                <div className="inputGroup">
                  <input name="21" id="21_a" value="a" type="radio" />
                  <label htmlFor="21_a">
                    <div className="col-11">
                      Μου προτείνουν περίεργες ιδέες/λύσεις
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="21" id="21_b" value="b" type="radio" />
                  <label htmlFor="21_b">
                    <div className="col-11">
                      Μου λένε σωστά πράγματα αλλά πάρα πολύ ώρα
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Είμαι...</h4>
                </li>
                <div className="inputGroup">
                  <input name="22" id="22_a" value="a" type="radio" />
                  <label htmlFor="22_a">
                    <div className="col-11">
                      Πρωινό άτομο
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="22" id="22_b" value="b" type="radio" />
                  <label htmlFor="22_b">
                    <div className="col-11">
                      Νυχτοπούλι
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Ένα νέο ραντεβού, προτιμώ</h4>
                </li>
                <div className="inputGroup">
                  <input name="23" id="23_a" value="a" type="radio" />
                  <label htmlFor="23_a">
                    <div className="col-11">
                      Να είναι απρόβλεπτο χωρίς ιδιαίτερο σχεδιασμό
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="23" id="23_b" value="b" type="radio" />
                  <label htmlFor="23_b">
                    <div className="col-11">
                      Να το έχω προσχεδιάσει
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Προτιμώ οι άνθρωποι να</h4>
                </li>
                <div className="inputGroup">
                  <input name="24" id="24_a" value="a" type="radio" />
                  <label htmlFor="24_a">
                    <div className="col-11">
                      Είναι ανοιχτοί στα συναισθήματά τους
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="24" id="24_b" value="b" type="radio" />
                  <label htmlFor="24_b">
                    <div className="col-11">
                      Είναι πιο συγκρατημένοι
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Θα προτιμούσα να δουλεύω για μία εταιρεία που
                  </h4>
                </li>
                <div className="inputGroup">
                  <input name="25" id="25_a" value="a" type="radio" />
                  <label htmlFor="25_a">
                    <div className="col-11">
                      Θα εξασκούσα το μυαλό μου
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="25" id="25_b" value="b" type="radio" />
                  <label htmlFor="25_b">
                    <div className="col-11">
                      Θα εργαζόμουν για να βοηθήσω να εκπληρωθεί ο στόχος της
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Τα σαββατοκύριακα, προτιμώ</h4>
                </li>
                <div className="inputGroup">
                  <input name="26" id="26_a" value="a" type="radio" />
                  <label htmlFor="26_a">
                    <div className="col-11">
                      Να σχεδιάζω το τι θα κάνω
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="26" id="26_b" value="b" type="radio" />
                  <label htmlFor="26_b">
                    <div className="col-11">
                      Να κάνω ότι τύχει
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Είμαι περισσότερο</h4>
                </li>
                <div className="inputGroup">
                  <input name="27" id="27_a" value="a" type="radio" />
                  <label htmlFor="27_a">
                    <div className="col-11">
                      Εξωστρεφής
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="27" id="27_b" value="b" type="radio" />
                  <label htmlFor="27_b">
                    <div className="col-11">
                      Εσωστρεφής
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">Θα προτιμούσα το ταίρι μου να</h4>
                </li>
                <div className="inputGroup">
                  <input name="28" id="28_a" value="a" type="radio" />
                  <label htmlFor="28_a">
                    <div className="col-11">
                      Έχει νέες ιδέες
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="28" id="28_b" value="b" type="radio" />
                  <label htmlFor="28_b">
                    <div className="col-11">
                      Είναι Πρακτικός/ή
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <li>
                  <h4 className="orange-text">
                    Παρακάτω επιλέξτε τις λέξεις που σας ταιριάζουν περισσότερο
                  </h4>
                </li>
                α.
                <div className="inputGroup">
                  <input name="29" id="29_a" value="a" type="radio" />
                  <label htmlFor="29_a">
                    <div className="col-11">
                      Κοινωνικός/ή
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="29" id="29_b" value="b" type="radio" />
                  <label htmlFor="29_b">
                    <div className="col-11">
                      Θεωρητικός/ή
                    </div>
                  </label>
                </div>
              </div>
              <div className="form-group">
                β.
                <div className="inputGroup">
                  <input name="30" id="30_a" value="a" type="radio" />
                  <label htmlFor="30_a">
                    <div className="col-11">
                      Εξυπνάδα
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="30" id="30_b" value="b" type="radio" />
                  <label htmlFor="30_b">
                    <div className="col-11">
                      Πρακτικότητα
                    </div>
                  </label>
                </div>
              </div>
              <div className="form-group">
                γ.
                <div className="inputGroup">
                  <input name="31" id="31_a" value="a" type="radio" />
                  <label htmlFor="31_a">
                    <div className="col-11">
                      Οργανωτικός/ή
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="31" id="31_b" value="b" type="radio" />
                  <label htmlFor="31_b">
                    <div className="col-11">
                      Ευπροσάρμοστος/η
                    </div>
                  </label>
                </div>
              </div>
              <div className="form-group">
                δ.
                <div className="inputGroup">
                  <input name="32" id="32_a" value="a" type="radio" />
                  <label htmlFor="32_a">
                    <div className="col-11">
                      Δραστήριος/ια
                    </div>
                  </label>
                </div>
                <div className="inputGroup">
                  <input name="32" id="32_b" value="b" type="radio" />
                  <label htmlFor="32_b">
                    <div className="col-11">
                      Συγκεντρωμένος/η
                    </div>
                  </label>
                </div>
              </div>
              <div className="form-group">
              <hr />
              <div className="row justify-content-center">
                <button type="commit" className="btn btn-primary btn-lg">
                  Δείτε τα αποτελέσματα
                </button>
              </div>
            </div>

          </ol>
        </form>
      </div>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postPersonalityResults }, dispatch)
}

export default connect(null, mapDispatchToProps)(PersonalityQuestions);
