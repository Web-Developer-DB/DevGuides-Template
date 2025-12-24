# SSH-Verbindung zu GitHub unter Linux & WSL

Ein praxisnaher Leitfaden, um sichere SSH-Keys für GitHub auf Linux-Distributionen oder Windows Subsystem for Linux (WSL) einzurichten.

## Voraussetzungen
- Git 2.34+ installiert (`git --version`)
- OpenSSH Client verfügbar (`ssh -V`)
- GitHub Account mit Zugriff auf die Weboberfläche

## 1. Bestehende Keys prüfen
```bash
ls -al ~/.ssh
```
- Prüfe, ob `id_ed25519` oder `id_rsa` bereits existiert.
- Falls ja und du sie weiterverwenden willst, überspringe Abschnitt 2.

## 2. Neuen Key erzeugen (Empfehlung: Ed25519)
```bash
ssh-keygen -t ed25519 -C "deine-email@domain.tld"
# Speicherort bestätigen: /home/<user>/.ssh/id_ed25519
# sicheres Passphrase setzen
```

Für Systeme ohne Ed25519-Support nutze RSA (4096 Bit):
```bash
ssh-keygen -t rsa -b 4096 -C "deine-email@domain.tld"
```

## 3. ssh-agent starten und Key laden
### Linux
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### WSL + Windows Agent teilen
Füge in `~/.ssh/config` hinzu:
```bash
Host *
  IdentityAgent ~/.ssh/agent.sock
```
Und starte den Agenten in `.bashrc`/`.zshrc`:
```bash
if ! ss -a | grep -q agent.sock; then
  rm -f ~/.ssh/agent.sock
  (setsid nohup socat UNIX-LISTEN:~/.ssh/agent.sock,fork EXEC:"/mnt/c/Windows/System32/OpenSSH/ssh-agent.exe" >/dev/null 2>&1 &)
fi
ssh-add ~/.ssh/id_ed25519
```
(Alternative: `ssh-agent` in WSL nutzen wie unter Linux.)

## 4. Öffentlichen Schlüssel kopieren
```bash
cat ~/.ssh/id_ed25519.pub
```
Kopiere den gesamten Output in die Zwischenablage.

## 5. Key bei GitHub hinterlegen
1. GitHub öffnen → `Settings` → `SSH and GPG keys`.
2. `New SSH key` wählen.
3. Titel vergeben (z.B. „WSL Dev“), Key einfügen, speichern.

## 6. Verbindung testen
```bash
ssh -T git@github.com
```
Erwartete Ausgabe beim ersten Mal:
```
Hi <username>! You've successfully authenticated...
```
Falls „Authenticity of host“ abgefragt wird, mit `yes` bestätigen (Host wird in `~/.ssh/known_hosts` hinterlegt).

## 7. Git auf SSH umstellen
Wechsle Remote-URL auf das SSH-Format:
```bash
git remote set-url origin git@github.com:<org>/<repo>.git
```

## Troubleshooting
| Problem | Lösung |
| --- | --- |
| `Permission denied (publickey)` | Prüfe `ssh-add -l`, Key ggf. erneut hinzufügen, Agent neu starten. |
| WSL findet Windows-Key nicht | Pfade in `~/.ssh/config` kontrollieren, sicherstellen dass `chmod 600 ~/.ssh/id_ed25519` gesetzt ist. |
| Falscher Account genutzt | `ssh -T git@github.com -i ~/.ssh/<anderer-key>` testen oder in `~/.ssh/config` host-spezifische Einträge definieren. |

## Bonus: Host-spezifische Konfiguration
`~/.ssh/config` Beispiel für mehrere Accounts:
```bash
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  AddKeysToAgent yes

Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/work_ed25519
```
Nutze dann `git@github-work:<org>/<repo>.git` für das Arbeitskonto.

## Checkliste
- Key im `~/.ssh` vorhanden und im Agent geladen.
- Public Key in GitHub hinterlegt.
- `ssh -T git@github.com` erfolgreich.
- Remote-URL auf SSH umgestellt.
- Optional: `~/.ssh/config` fuer mehrere Accounts gepflegt.
