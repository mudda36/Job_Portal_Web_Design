import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// JOB DATA
// ==================================
const jobs = [
  {
    id: "TT-DES-001",
    title: "Design Engineer – Turbine",
    department: <b>Engineering</b>,
    location: <b>Bengaluru, India</b>,
    description:
      <b>Responsible for turbine design, analysis and development to ensure high performance and reliability.</b>
  },
  {
    id: "TT-QUA-002",
    title: "Quality Engineer",
    department: <b>Quality</b>,
    location: <b>Pune, India</b>,
    description:
      <b>Ensure product quality standards and continuous improvement in processes and systems.</b>
  },
  {
    id: "TT-SER-003",
    title: "Service Engineer",
    department: <b>Service</b>,
    location: <b>Across India</b>,
    description:
      <b>Installation, commissioning and after-sales service support for steam turbines.</b>
  }
];


// HEADER
// ======================================================

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">

        <Link className="brand" to="/">
          <span className="brand-mark">Triveni</span>
          <span className="brand-sub">TURBINES</span>
        </Link>

        <nav className="nav">

          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#services">Parts Sales & Services</a>
          <a href="#refurb">
            REFURB®
            <small>(Multi-brand)</small>
          </a>
          <a href="#investors">Investors</a>
          <a href="#sustainability">Sustainability</a>
          <a href="#contact">Contact Us</a>

        </nav>

      </div>
    </header>
  );
}


// JOB CARD
// ======================================================

function JobCard({ job, onApply, onDetails }) {

  return (
    <article className="job-card">
      <div>
        <h2>{job.title}</h2>
        <div className="job-meta">
          <span> 🈺 {job.department}</span>
          <span>📍 {job.location}</span>
        </div><p>{job.description}</p>
      </div>
      <div className="job-actions">
        <button
          className="btn btn-secondary"
          onClick={() => onDetails(job)}>
          View Details
        </button>
        <button
          className="btn btn-primary"
          onClick={() => onApply(job)}>
          Apply Now
        </button>
      </div>
    </article>
  );
}

// CAREERS PAGE - PAGE 1
// ======================================================

function CareersPage({ onApply, onDetails }) {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="hero">
          {/* <span className="eyebrow">Careers</span> */}
          <h1>Job Opportunities</h1>
          <p>
            <b>Explore exciting career opportunities and be part
            of our growth journey.</b>
          </p>
        </section>
        <section
          className="jobs"
          aria-label="Available jobs"
        >
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={onApply}
              onDetails={onDetails}
            />
          ))}
        </section>
        <p className="alt-contact">
          <b>Don't see the right role?
          Share your resume with us at</b>
          <a href="mailto:careers@triveniturbines.com">
            {" "}careers@triveniturbines.com
          </a>
        </p>
      </main>
    </>
  );
}

// JOB DETAILS MODAL
// ======================================================

function JobDetails({
  job,
  onApply,
  onClose
}) {
  if (!job) {
    return null;
  }
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      <section
        className="modal"
        onClick={(e) => e.stopPropagation()} >
        <button
          className="modal-close"
          onClick={onClose}>×</button>
        <span className="eyebrow">Job Details</span>
        <h2>
          {job.title}
        </h2>
        <p className="detail-meta">
          {job.department} · {job.location}</p>
        <p>{job.description}</p>
        <div className="detail-box">
          <strong>Job ID</strong>
          <span>{job.id}</span>
        </div>
        <button
          className="btn btn-primary full"
          onClick={() => {
            onClose();
            onApply(job);
          }}>
          Apply Now
        </button>
      </section>
    </div>
  );
}

// FORM FIELD
// ======================================================

function Field({
  label,
  error,
  children,
  required = true
}) {
  return (
    <div className="field">
      <label>
        {label}
        {required && (
          <span aria-hidden="true">{" "}*</span>
        )}
      </label>
      {children}
      {error && (
        <p className="error">
          {error}
        </p>
      )}
    </div>
  );
}


// APPLICATION PAGE 
// ======================================================

function ApplicationPage({
  job,
  onSuccess,
  onBack
}) {

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    message: ""
  });
  const [errors, setErrors] = useState({});

  // UPDATE FORM
  // --------------------------------------------------

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: ""
    }));
  };

  // VALIDATION
  // --------------------------------------------------

  const validate = () => {
    const next = {};
    
    // Full Name
    if (
      !form.fullName.trim() ||
      form.fullName.trim().length < 2
    ) {
      next.fullName =
        "Please enter your full name.";
    }

    // Email
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      )
    ) {
      next.email =
        "Please enter a valid email address.";
    }

    // Phone
    if (
      !/^[6-9]\d{9}$/.test(
        form.phone.trim()
      )
    ) {
      next.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    // Resume
    if (!form.resume) {
      next.resume =
        "Please upload your resume.";
    }
    else if (
      form.resume.size >
      5 * 1024 * 1024
    ) {
      next.resume =
        "Resume must be 5 MB or smaller.";
    }
    else if (
      !/\.(pdf|doc|docx)$/i.test(
        form.resume.name
      )
    ) {
      next.resume =
        "Only PDF, DOC or DOCX files are accepted.";
    }

    // Message
    if (
      !form.message.trim() ||
      form.message.trim().length < 10
    ) {
      next.message =
        "Please enter at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };


  // SUBMIT
  // --------------------------------------------------
  const submit = (e) => {
    e.preventDefault();

    // Stop if validation fails

    if (!validate()) {
      return;
    }

    // Application data

    const applicationData = {
      jobId: job.id,
      jobTitle: job.title,
      fullName:
        form.fullName.trim(),
      email:
        form.email.trim(),
      phone:
        form.phone.trim(),
      resumeName:
        form.resume?.name || "",
      message:
        form.message.trim()
    };

    // Temporary local storage
    // Later this can be replaced by API call

    localStorage.setItem(
      "lastJobApplication",
      JSON.stringify(applicationData)
    );

    // IMPORTANT
    // Go to PAGE 6 instead of PAGE 7

    onSuccess();

  };


  return (
    <>
      <Header />
      <main className="page-shell form-page">
        <button
          className="back-link"
          onClick={onBack}
        >
          ← Back to Careers
        </button>
        <section className="form-card">
          {/* <span className="eyebrow">
            Career Application
          </span> */}
          <h1>
            Apply for the Position
          </h1>

          {/* SELECTED JOB */}

          <div className="selected-job">
            <span>
             <b> You are applying for:</b>
            </span>
            <strong>
              {job.title}
            </strong>
            <small>
            <b>  Job ID: {job.id}</b>
            </small>
          </div>
          <form
            onSubmit={submit}
            noValidate
          >

            {/* FULL NAME */}

            <Field
              label="Full Name"
              error={errors.fullName}
            >
              <input
                value={form.fullName}
                onChange={(e) =>
                  update(
                    "fullName",
                    e.target.value
                  )
                }
                placeholder="Enter your full name"
              />
            </Field>

            {/* EMAIL */}

            <Field
              label="Email Address"
              error={errors.email}
            >
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  update(
                    "email",
                    e.target.value
                  )
                }
                placeholder="Enter your email address"
              />
            </Field>

            {/* PHONE */}

            <Field
              label="Phone Number"
              error={errors.phone}
            >
              <input
                type="tel"
                inputMode="numeric"
                maxLength="10"
                value={form.phone}
                onChange={(e) =>
                  update(
                    "phone",
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10)
                  )
                }
                placeholder="Enter your phone number"
              />
            </Field>

            {/* RESUME */}

            <Field
              label="Resume"
              error={errors.resume}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  update(
                    "resume",
                    e.target.files?.[0] || null
                  )
                }
              />
              <small className="hint">
                PDF, DOC, DOCX · Max 5 MB
              </small>
            </Field>

            {/* MESSAGE */}

            <Field
              label="Message / Cover Letter"
              error={errors.message}
            >
              <textarea
                rows="6"
                value={form.message}
                onChange={(e) =>
                  update(
                    "message",
                    e.target.value
                  )
                }
                placeholder="Tell us something about yourself..."
              />
            </Field>

            {/* SUBMIT */}

            <button
              className="btn btn-primary submit-btn"
              type="submit"
            >
              Submit Application
            </button>

          </form>

        </section>

      </main>

    </>
  );
}



// PAGE 6 - DATA SENT TO ADMIN / HR
// ======================================================

function SendingPage() {
  return (
    <>
      <Header />
      <main className="sending-page">
        <div className="sending-card">

          {/* ICON */}
          <div className="sending-icon">
            <div className="document-icon">
              📄
            </div>
            <div className="mail-icon">
              ✉
            </div>
            <div className="check-icon">
              ✓
            </div>
          </div>
          <h1>
            Application details are sent to
          </h1>
          <h2>
            Admin / HR via Email
          </h2>

          {/* SENT DATA */}

          <div className="sent-details">
            <div>
              <span className="green-check">
                ✓
              </span>
              Applicant Name
            </div>
            <div>
              <span className="green-check">
                ✓
              </span>
              Email
            </div>
            <div>
              <span className="green-check">
                ✓
              </span>
              Phone Number
            </div>
            <div>
              <span className="green-check">
                ✓
              </span>
              Selected Job Title & ID
            </div>
            <div>
              <span className="green-check">
                ✓
              </span>
              Message / Cover Letter
            </div>
            <div>
              <span className="green-check">
                ✓
              </span>
              Resume Attachment
            </div>
          </div>
          <p className="sending-text">
            Sending application details...
          </p>

          {/* LOADING BAR */}

          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </main>
    </>
  );
}


// PAGE 7 - THANK YOU
// ======================================================

function SuccessPage({ onBack }) {

  return (

    <>
      <Header />

      <main className="success-page">


        <div className="success-icon">
          ✓
        </div>


        <span className="eyebrow">
          Application Received
        </span>


        <h1>
          Thank You!
        </h1>


        <p>
          Your application has been submitted successfully.
        </p>


        <p>
          Our team will contact you soon.
        </p>


        <button
          className="btn btn-primary"
          onClick={onBack}
        >
          Back to Careers
        </button>


      </main>

    </>
  );
}

// MAIN APP
// ======================================================

export default function App() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] =
    useState(null);
  const [detailsJob, setDetailsJob] =
    useState(null);

  // Page 6 state

  const [sending, setSending] =
    useState(false);


  // Page 7 state

  const [submitted, setSubmitted] =
    useState(false);

  // APPLY NOW
  // --------------------------------------------------

  const apply = (job) => {
    setSelectedJob(job);
    setSending(false);
    setSubmitted(false);
    navigate("/apply");
  };

  // BACK TO CAREERS
  // --------------------------------------------------

  const back = () => {
    setSelectedJob(null);
    setSending(false);
    setSubmitted(false);
    navigate("/");
  };

  // PAGE 5 -> PAGE 6
  // --------------------------------------------------

  const success = () => {
    setSending(true);
    navigate("/sending");
  };


  // PAGE 6 -> PAGE 7
  // --------------------------------------------------

  useEffect(() => {
    if (!sending) {
      return;
    }
    const timer = setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      navigate("/success");
    }, 3500);
    return () => {
      clearTimeout(timer);
    };
  }, [sending, navigate]);

  // PAGE 6
  // --------------------------------------------------
  if (
    window.location.pathname === "/sending"
  ) {
    return <SendingPage />;
  }

  // PAGE 7
  // --------------------------------------------------

  if (
    window.location.pathname === "/success"
  ) {
    return (
      <SuccessPage
        onBack={back}
      />
    );
  }

  // PAGE 3 / 4 / 5
  // --------------------------------------------------

  if (
    window.location.pathname === "/apply" &&
    selectedJob
  ) {
    return (
      <ApplicationPage
        job={selectedJob}
        onSuccess={success}
        onBack={back}
      />
    );
  }


  // PAGE 1 / PAGE 2
  // --------------------------------------------------

  return (
    <>
      <CareersPage
        onApply={apply}
        onDetails={setDetailsJob}
      />
      <JobDetails
        job={detailsJob}
        onApply={apply}
        onClose={() =>
          setDetailsJob(null)
        }
      />
    </>
  );
}