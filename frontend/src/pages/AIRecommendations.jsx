import { useState, useEffect } from 'react';
import { Sparkles, Trophy, BookOpen, AlertTriangle } from 'lucide-react';
import api from '../api';

const AIRecommendations = () => {
  const [employees, setEmployees] = useState([]);
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAndGenerate = async () => {
      try {
        const { data: emps } = await api.get('/employees');
        setEmployees(emps);
        
        if (emps.length > 0) {
          const { data: aiResponse } = await api.post('/ai/recommend', { employees: emps });
          setAiData(aiResponse);
        }
      } catch (err) {
        setError('Failed to load AI recommendations.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAndGenerate();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '1rem' }}>
        <Sparkles size={40} className="animate-pulse" style={{ color: 'var(--primary)' }} />
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>AI is analyzing your workforce...</h2>
        <p style={{ color: 'var(--text-muted)' }}>This might take a few seconds.</p>
      </div>
    );
  }

  if (error) {
    return <div style={{ padding: '2rem', background: '#FEE2E2', color: 'var(--danger)', borderRadius: '8px' }}>{error}</div>;
  }

  if (employees.length === 0) {
    return <div style={{ padding: '2rem', background: '#F3F4F6', borderRadius: '8px', textAlign: 'center' }}>No employees to analyze. Add some employees first.</div>;
  }

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700' }}>AI Insights</h1>
          <p style={{ color: 'var(--text-muted)' }}>Powered by Advanced AI to manage your workforce.</p>
        </div>
      </div>

      {aiData && (
        <div className="grid-2">
          {/* Promotions */}
          <div className="card ai-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>
              <Trophy size={20} /> Promotions
            </h3>
            {aiData.promotions && Array.isArray(aiData.promotions) ? aiData.promotions.map((promo, idx) => (
              <div key={idx} className="ai-section">
                <strong>{promo.name || promo.employeeName}</strong>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{promo.reason || promo.recommendation}</p>
              </div>
            )) : <p>No specific promotion recommendations.</p>}
          </div>

          {/* Rankings */}
          <div className="card ai-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>
              <Trophy size={20} /> Top Rankings
            </h3>
            <ol style={{ paddingLeft: '1.5rem' }}>
              {aiData.rankings && Array.isArray(aiData.rankings) ? aiData.rankings.map((rank, idx) => (
                <li key={idx} style={{ marginBottom: '1rem' }}>
                  <strong>{rank.name || rank.employeeName}</strong>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{rank.reason || rank.justification}</div>
                </li>
              )) : <p>Ranking data not available.</p>}
            </ol>
          </div>

          {/* Training */}
          <div className="card ai-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>
              <BookOpen size={20} /> Training Suggestions
            </h3>
            {aiData.trainingSuggestions && Array.isArray(aiData.trainingSuggestions) ? aiData.trainingSuggestions.map((train, idx) => (
              <div key={idx} className="ai-section">
                <strong>{train.name || train.employeeName}</strong>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {train.suggestedSkills && train.suggestedSkills.map((skill, sIdx) => (
                    <span key={sIdx} className="badge">{skill}</span>
                  ))}
                </div>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{train.reason}</p>
              </div>
            )) : <p>No training suggestions.</p>}
          </div>

          {/* Feedback */}
          <div className="card ai-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>
              <AlertTriangle size={20} /> General Feedback
            </h3>
            {aiData.feedback && Array.isArray(aiData.feedback) ? aiData.feedback.map((fb, idx) => (
              <div key={idx} className="ai-section">
                <strong>{fb.name || fb.employeeName}</strong>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{fb.feedbackText || fb.feedback}</p>
              </div>
            )) : <p>{typeof aiData.feedback === 'string' ? aiData.feedback : 'No feedback available.'}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
