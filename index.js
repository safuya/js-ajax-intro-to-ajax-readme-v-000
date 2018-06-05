function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/safuya/repos')
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commitBullets(commits)}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}

function commitBullets(commits) {
  return commits.map(c => `<li><strong>${c.author.login}</strong> - ${c.commit.message}</li>`)
                .join('')
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", `https://api.github.com/repos/safuya/${name}/commits`)
  req.send()
}
