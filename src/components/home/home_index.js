import React, { Component } from 'react';
import logo from '../../images/kardies-logo-original.png';
import background from '../../images/hands_bg.jpg';
import { history } from '../../helpers/history'
import Footer from './footer'

export default class HomeIndex extends Component {
  componentDidMount() {
    if(localStorage.getItem('user')) {
      history.push('/users');
    }
  }

  render() {
    return(
      <span>
        <header style={{ backgroundImage: `url(${background})` }}>
          <div className="row justify-content-end mr-4">
            <div className="mt-4">
              <a href="/login" className="btn btn-orange">
                Σύνδεση
              </a>
            </div>
          </div>
          <div className="header-content">
            <div className="header-content-inner">
              <img src={logo} className="logo mb-4" alt='kardies.gr logo'/>
              <h1 className="white-text" id="homeHeading">
                Το νέο δωρεάν Ελληνικό site γνωριμιών
              </h1>
              <hr className="custom"/>
              <p>
                Δωρεάν γνωριμίες για όλη την Ελλάδα, γίνε κι εσύ μέλος σήμερα
                για να γνωρίσεις έυκολα και γρήγορα τον επόμενο έρωτά σου.
              </p>
              <div className="col-sm-12 col-md-6 col-lg-4 mx-auto">
                <a href="/sign_up" className="btn btn-orange btn-lg btn-block">
                  Εγγραφή
                </a>
              </div>
            </div>
          </div>
        </header>
        <section className="bg-orange" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="section-heading">Γιατί όλοι έχουν δικαίωμα στην αγάπη!</h2>
                <hr className="light"/>
                <p className="home-p">
                  Τo Κardies.gr είναι 100% Ελληνικό site γνωριμιών και έχει σχεδιαστεί με ένα σκοπό,
                  ευκολία χρήσης για γρήγορες γνωριμίες, απολύτως δωρεάν για πάντα!
                  Το αποτέλεσμα είναι οι γνωριμίες να γίνονται πολύ πιο έυκολα
                  και γρήγορα από οποιοδήποτε άλλο ελληνικό site. Σας αρέσει κάποιος?
                  Μπείτε κατ'ευθείαν στο ψητό στέλνοντας μία καρδιά ή ένα προσωπικό
                  μήνυμα και γνωρίστε τον επόμενο έρωτά σας!
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </span>
    );
  }
}
