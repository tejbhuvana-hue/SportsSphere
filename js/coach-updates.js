document.addEventListener("DOMContentLoaded", () => {
  // Load State
  if (window.EventFlow) {
    EventFlow.loadState();
  }

  // Parse query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const matchId = urlParams.get("matchId");
  const eventId = urlParams.get("eventId");

  // Determine current page based on headings or form details
  const isSchedulePage = document.querySelector("title")?.textContent.includes("Schedule");
  const isUpdateScorePage = document.querySelector("title")?.textContent.includes("Ongoing");
  const isReportPage = document.querySelector("title")?.textContent.includes("Report");

  // Helper: Get match by ID
  function getMatchById(id) {
    if (!window.EventFlow) return null;
    return EventFlow.getMatches().find(m => m.id === id);
  }

  // Helper: Get event by match/id
  function getEventById(id) {
    if (!window.EventFlow) return null;
    return EventFlow.getEvents().find(e => e.id === id);
  }

  // Helper: Generate team logo letter
  function getLogoLetter(teamName) {
    return (teamName || 'T').trim().charAt(0).toUpperCase();
  }

  // ==========================================
  // PAGE 1: SCHEDULE MATCH (update3.html)
  // ==========================================
  if (isSchedulePage) {
    const form = document.querySelector(".container");
    const inputs = form.querySelectorAll("input");
    const selects = form.querySelectorAll("select");
    const saveBtn = form.querySelector("button");

    let currentMatch = null;
    let event = null;
    if (eventId) {
      event = getEventById(eventId);
    }

    if (matchId) {
      currentMatch = getMatchById(matchId);
      if (currentMatch) {
        inputs[0].value = currentMatch.sport || 'Football';
        inputs[1].value = currentMatch.teamA || '';
        inputs[2].value = currentMatch.teamB || '';
        inputs[3].value = currentMatch.date || '';
        inputs[4].value = currentMatch.time || '';
        inputs[5].value = currentMatch.venue || '';
        selects[0].value = currentMatch.type || 'League';
        inputs[6].value = currentMatch.referee || '';
        selects[1].value = currentMatch.status === 'Live' ? 'Scheduled' : currentMatch.status;
      }
    } else if (event) {
      inputs[0].value = event.category || 'Football';
      inputs[5].value = event.location || event.venue || '';
      if (event.date && event.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        inputs[3].value = event.date;
      }
    }

    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const matches = EventFlow.getMatches();

      const updatedData = {
        sport: inputs[0].value,
        teamA: inputs[1].value,
        teamB: inputs[2].value,
        date: inputs[3].value,
        time: inputs[4].value,
        venue: inputs[5].value,
        type: selects[0].value,
        referee: inputs[6].value,
        status: selects[1].value, // e.g. Scheduled or Postponed
      };

      if (currentMatch) {
        // Update existing match
        const idx = matches.findIndex(m => m.id === matchId);
        if (idx !== -1) {
          matches[idx] = { 
            ...matches[idx], 
            ...updatedData,
            eventId: matches[idx].eventId || eventId || '',
            eventTitle: matches[idx].eventTitle || (event ? event.title : '')
          };
        }
        EventFlow.createNotification(
          'Match Schedule Updated',
          `Match ${updatedData.teamA} vs ${updatedData.teamB} schedule has been updated.`,
          ['player', 'coach', 'club', 'organization']
        );
      } else {
        // Create new match
        const activeEventId = eventId || (event ? event.id : '');
        const activeEventTitle = event ? event.title : (updatedData.sport + ' Match');
        const newMatch = {
          id: 'match-' + Date.now(),
          score: '0 - 0',
          assignedCoach: 'Mike Ross',
          eventId: activeEventId,
          eventTitle: activeEventTitle,
          ...updatedData
        };
        matches.push(newMatch);
        EventFlow.createNotification(
          'New Match Scheduled',
          `A new match has been scheduled: ${newMatch.teamA} vs ${newMatch.teamB} on ${newMatch.date}.`,
          ['player', 'coach', 'club', 'organization']
        );
      }

      EventFlow.saveMatches(matches);
      alert('Match schedule saved successfully!');
      window.close(); // Close tab or redirect back
    });
  }

  // ==========================================
  // PAGE 2: UPDATE SCORE (update2.html)
  // ==========================================
  if (isUpdateScorePage) {
    const form = document.querySelector(".container");
    const inputs = form.querySelectorAll("input");
    const select = form.querySelector("select");
    const textareas = form.querySelectorAll("textarea");
    const saveBtn = form.querySelector("button");

    let currentMatch = null;
    if (matchId) {
      currentMatch = getMatchById(matchId);
      if (currentMatch) {
        inputs[0].value = currentMatch.teamA || '';
        inputs[1].value = currentMatch.teamB || '';
        const scores = (currentMatch.score || '0 - 0').split('-');
        inputs[2].value = parseInt(scores[0]) || 0;
        inputs[3].value = parseInt(scores[1]) || 0;
        inputs[4].value = currentMatch.matchTime || 45;
        select.value = currentMatch.strategy || 'Attack';
        textareas[0].value = currentMatch.instructions || '';
        textareas[1].value = currentMatch.feedback || '';
        inputs[5].value = currentMatch.completionPercent || 50;
        document.getElementById("progressValue").textContent = (currentMatch.completionPercent || 50) + '%';
        textareas[2].value = currentMatch.disciplineNotes || '';
      }
    }

    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const matches = EventFlow.getMatches();

      const scoreStr = `${inputs[2].value} - ${inputs[3].value}`;
      const completionPercent = parseInt(inputs[5].value);
      let status = 'Live';
      if (completionPercent === 100) {
        status = 'Completed';
      }

      const updatedData = {
        teamA: inputs[0].value,
        teamB: inputs[1].value,
        score: scoreStr,
        matchTime: inputs[4].value,
        strategy: select.value,
        instructions: textareas[0].value,
        feedback: textareas[1].value,
        completionPercent: completionPercent,
        status: status,
        disciplineNotes: textareas[2].value
      };

      if (currentMatch) {
        const idx = matches.findIndex(m => m.id === matchId);
        if (idx !== -1) {
          matches[idx] = { ...matches[idx], ...updatedData };
        }
        
        if (currentMatch.status !== 'Live' && status === 'Live') {
          EventFlow.createNotification(
            'Match Starting',
            `Match Starting: ${updatedData.teamA} vs ${updatedData.teamB} is now LIVE.`,
            ['player', 'coach', 'club', 'organization']
          );
        } else {
          EventFlow.createNotification(
            'Match Score Updated',
            `Match Score Update: ${updatedData.teamA} ${scoreStr} ${updatedData.teamB}.`,
            ['player', 'coach', 'club', 'organization']
          );
        }
      }

      EventFlow.saveMatches(matches);
      alert('Match details and score updated!');
      window.close();
    });
  }

  // ==========================================
  // PAGE 3: COACH MATCH REPORT (coach-updates.html)
  // ==========================================
  if (isReportPage) {
    const form = document.querySelector(".report-form");
    const inputs = form.querySelectorAll("input");
    const selects = form.querySelectorAll("select");
    const textareas = form.querySelectorAll("textarea");

    let currentMatch = null;
    if (matchId) {
      currentMatch = getMatchById(matchId);
      if (currentMatch) {
        inputs[0].value = currentMatch.eventTitle || '';
        inputs[1].value = currentMatch.date || '';
        inputs[2].value = currentMatch.venue || '';
        inputs[3].value = currentMatch.teamA || '';
        inputs[4].value = currentMatch.teamB || '';
        selects[0].value = currentMatch.type || 'League';
        const scores = (currentMatch.score || '0 - 0').split('-');
        inputs[5].value = scores[0]?.trim() || '';
        inputs[6].value = scores[1]?.trim() || '';
        
        let winnerName = 'Draw Match';
        if (currentMatch.winner) {
          winnerName = currentMatch.winner;
        } else {
          const scoreAVal = parseInt(scores[0]) || 0;
          const scoreBVal = parseInt(scores[1]) || 0;
          if (scoreAVal > scoreBVal) winnerName = currentMatch.teamA;
          else if (scoreBVal > scoreAVal) winnerName = currentMatch.teamB;
        }
        inputs[7].value = winnerName === 'Draw Match' ? 'Draw Match' : `${winnerName} Won`;
      }
    }

    // Render dynamic completed matches
    function renderCompletedMatches() {
      const listContainer = document.querySelector(".matches-list");
      if (!listContainer) return;
      const completed = EventFlow.getMatches().filter(m => m.status === 'Completed');

      listContainer.innerHTML = '';
      if (completed.length === 0) {
        listContainer.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 20px;">No completed matches yet.</p>';
        return;
      }

      completed.forEach(m => {
        const scores = m.score.split('-');
        const scoreA = parseInt(scores[0]) || 0;
        const scoreB = parseInt(scores[1]) || 0;
        
        let statusA = 'Winner';
        let statusB = 'Winner';
        if (scoreA > scoreB) {
          statusA = 'Winner';
          statusB = 'Defeated';
        } else if (scoreB > scoreA) {
          statusA = 'Defeated';
          statusB = 'Winner';
        } else {
          statusA = 'Draw';
          statusB = 'Draw';
        }

        const matchCard = document.createElement("div");
        matchCard.className = "match-card";
        matchCard.innerHTML = `
          <div class="team left">
            <div class="logo">${getLogoLetter(m.teamA)}</div>
            <div>
              <div><strong>${m.teamA}</strong></div>
              <div class="status">${statusA}</div>
            </div>
          </div>

          <div class="center-result">
            <div class="score">${m.score}</div>
            <div class="result">${m.winner === 'Draw Match' ? 'Draw Match' : m.winner + ' Won'}</div>
          </div>

          <div class="team right">
            <div>
              <div><strong>${m.teamB}</strong></div>
              <div class="status">${statusB}</div>
            </div>
            <div class="logo">${getLogoLetter(m.teamB)}</div>
          </div>
        `;
        listContainer.appendChild(matchCard);
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const matches = EventFlow.getMatches();

      const scoreA = inputs[5].value;
      const scoreB = inputs[6].value;
      const resultText = inputs[7].value;
      const scoreStr = `${scoreA} - ${scoreB}`;

      let winner = 'Draw Match';
      if (resultText.toLowerCase().includes('draw')) {
        winner = 'Draw Match';
      } else {
        const teamA = inputs[3].value;
        const teamB = inputs[4].value;
        if (resultText.toLowerCase().includes(teamA.toLowerCase())) {
          winner = teamA;
        } else if (resultText.toLowerCase().includes(teamB.toLowerCase())) {
          winner = teamB;
        } else {
          winner = resultText.replace('Won', '').trim();
        }
      }

      const updatedFields = {
        eventTitle: inputs[0].value,
        date: inputs[1].value,
        venue: inputs[2].value,
        teamA: inputs[3].value,
        teamB: inputs[4].value,
        type: selects[0].value,
        score: scoreStr,
        winner: winner,
        status: 'Completed',
        completionDate: new Date().toISOString().split('T')[0],
        stats: `Best Player: ${inputs[8].value || 'N/A'}. Bowler/Defender: ${inputs[9].value || 'N/A'}. Top Scorer: ${inputs[10].value || 'N/A'}`
      };

      if (currentMatch) {
        const idx = matches.findIndex(m => m.id === matchId);
        if (idx !== -1) {
          matches[idx] = { 
            ...matches[idx], 
            ...updatedFields,
            eventId: matches[idx].eventId || eventId || ''
          };
        }
      } else {
        const newMatch = {
          id: 'match-' + Date.now(),
          assignedCoach: 'Mike Ross',
          eventId: eventId || '',
          ...updatedFields
        };
        matches.push(newMatch);
      }

      EventFlow.saveMatches(matches);

      // Handle complete associated event via the clean endEvent API
      const markEventVal = selects[1].value; // yes or no
      const targetEventId = (currentMatch ? currentMatch.eventId : null) || eventId;
      if (markEventVal === 'yes' && targetEventId) {
        EventFlow.endEvent(targetEventId);
      }

      EventFlow.createNotification(
        'Match Report Created',
        `Match report finalized: ${updatedFields.teamA} vs ${updatedFields.teamB} (${scoreStr}).`,
        ['player', 'coach', 'club', 'organization']
      );

      alert('Match report saved successfully!');
      renderCompletedMatches();
      
      // Optionally redirect or close if opened in new tab
      setTimeout(() => {
        window.close();
      }, 500);
    });

    renderCompletedMatches();
  }
});
