import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { LOGIN_CONTENT } from 'mockDb';
import qrPath from './loginQrPath';
import './Login.css';

const { brand, liveLabel, headline, lead, points, steps, account, ticket } = LOGIN_CONTENT;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector(state => state.auth);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!username || !password) return;
    setLoading(true);
    await dispatch(login(username, password));
    setLoading(false);
  };

  return (
    <div className="lgn">
      <section className="lgn-l">
        <div className="lgn-top">
          <div className="lgn-brand">
            <span className="mk" />
            <span>{brand.name}<small>{brand.caption}</small></span>
          </div>
          <span className="lgn-live">{liveLabel}</span>
        </div>

        <div className="lgn-stage" aria-hidden="true">
          <div className="lgn-ac lgn-fa">
            <div className="lgn-ah">
              <span className="lgn-av">{account.initials}</span>
              <div><b>{account.name}</b><small>{account.company}</small></div>
            </div>
            <span className="lgn-vf">{account.badge}</span>
            <div className="lgn-ar">
              <span>Stall<strong>{account.stall}</strong></span>
              <span>Package<strong>{account.package}</strong></span>
            </div>
          </div>

          <div className="lgn-tk lgn-ft">
            <div className="lgn-tl">
              <em>{ticket.kind}</em>
              <b>{ticket.event}</b>
              <small>{ticket.place}<br />{ticket.access}</small>
              <u>{ticket.status}</u>
            </div>
            <div className="lgn-tr">
              <svg viewBox="0 0 29 29" shapeRendering="crispEdges">
                <path d={qrPath} fill="#1B2430" />
              </svg>
            </div>
          </div>

          <div className="lgn-fl">
            <div className="lgn-fh"><b>From setup to success</b><span>6 steps</span></div>
            <div className="lgn-fs">
              {steps.map(s => (
                <div className="lgn-st" key={s.n} style={{ '--c': s.c, '--n': s.next, '--g': s.glow }}>
                  <i>
                    <svg viewBox="0 0 24 24"><path d={s.d} /></svg>
                  </i>
                  <small>{s.n}</small>
                  <b>{s.title}</b>
                  <span>{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2>{headline}</h2>
          <p>{lead}</p>
          <div className="lgn-pts">
            {points.map(text => (
              <div className="lgn-pt" key={text}>
                <i>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </i>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lgn-r">
        <form className="lgn-card" onSubmit={handleSubmit} noValidate>
          <h1>Welcome back</h1>
          <div className="lgn-bar" />
          <p className="lgn-sub">Sign in to the organiser console</p>

          <div className="lgn-f">
            <label htmlFor="lgn-email">Email</label>
            <div className="lgn-in">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3zM3 7l9 6 9-6" /></svg>
              <input
                id="lgn-email"
                type="text"
                name="username"
                placeholder="you@company.com"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            {touched && !username && <div className="lgn-ferr">Email is required</div>}
          </div>

          <div className="lgn-f">
            <label htmlFor="lgn-pwd">Password</label>
            <div className="lgn-in">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11h14v9H5zM8 11V8a4 4 0 018 0v3" /></svg>
              <input
                id="lgn-pwd"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(s => !s)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {touched && !password && <div className="lgn-ferr">Password is required</div>}
          </div>

          <div className="lgn-opt">
            <label>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
              Keep me signed in
            </label>
            <a href="/forgot-password">Forgot password?</a>
          </div>

          {error && <div className="lgn-err">{error}</div>}

          <button type="submit" className="lgn-go" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="lgn-foot">
            <div>Need access? <a href="mailto:admin@loonsexpo.com">Ask your event admin</a></div>
            <div>Exhibitor? <a href="/signup">Go to the Exhibitor portal</a></div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
