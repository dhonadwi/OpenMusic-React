import ProgressBar from './ProgressBar';

export default function Skill() {
  return (
    <section id="skills" className="skills section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Skills</h2>
        <p>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row skills-content skills-animation">
          <div className="col-lg-6">
            <div className="progress">
              <span className="skill">
                <span>HTML</span> <i className="val">100%</i>
              </span>
              <ProgressBar value={100} />
            </div>

            <div className="progress">
              <span className="skill">
                <span>CSS</span> <i className="val">90%</i>
              </span>
              <ProgressBar value={90} />
            </div>

            <div className="progress">
              <span className="skill">
                <span>JavaScript</span> <i className="val">75%</i>
              </span>
              <ProgressBar value={75} />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="progress">
              <span className="skill">
                <span>PHP</span> <i className="val">80%</i>
              </span>
              <ProgressBar value={80} />
            </div>

            <div className="progress">
              <span className="skill">
                <span>WordPress/CMS</span> <i className="val">90%</i>
              </span>
              <ProgressBar value={90} />
            </div>

            <div className="progress">
              <span className="skill">
                <span>Photoshop</span> <i className="val">55%</i>
              </span>
              <ProgressBar value={55} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
