# Kostenlose Sicherheits-Tools für Linux Mint 22.3

**Problem/Goal:** System prüfen und absichern, ohne Overkill oder Angstmodus.

## Voraussetzungen
- Linux Mint 22.3
- sudo-Rechte
- Internetzugang für APT/Flatpak

## Schritte

### Vorbereitung: System aktuell halten
```bash
sudo apt update
sudo apt upgrade
```
- Flatpak-Apps ebenfalls aktualisieren:
```bash
flatpak update
```

### 1. ClamAV installieren und scannen
```bash
sudo apt update
sudo apt install clamav clamav-freshclam
sudo freshclam
clamscan -r --bell -i /home
```
- Wenn keine Ausgabe erscheint, wurde nichts infiziert gefunden.
- Tipp: Große Verzeichnisse aussparen, um Laufzeit zu sparen.
```bash
clamscan -r -i /home --exclude-dir="^/home/.*/\\.cache" --exclude-dir="^/home/.*/Downloads"
```
- Ergebnisse landen standardmaessig im Terminal, bei Bedarf in eine Logdatei schreiben:
```bash
clamscan -r -i /home --log=/tmp/clamav-scan.log
```
- Wenn du USB-Sticks nutzt, scanne sie gezielt:
```bash
clamscan -r -i /media/$USER
```
- Optional: infizierte Dateien in Quarantaene verschieben.
```bash
clamscan -r -i /home --move=/tmp/clamav-quarantine
# HINWEIS: Erst Log pruefen, dann Quarantaene beurteilen.
```
- Status der Signatur-Updates pruefen:
```bash
systemctl status clamav-freshclam
```

### 2. rkhunter für Rootkit-Checks
```bash
sudo apt install rkhunter
sudo rkhunter --update
sudo rkhunter --check
# HINWEIS: Warnungen bedeuten nicht automatisch eine Infektion.
```
- Lies die Meldungen genau, Mint liefert häufig False Positives.
- Detailliertes Log:
```bash
sudo less /var/log/rkhunter.log
```
- Nach Kernel- oder Systemupdates erneut scannen.
- Optional: Baseline-Checks aktualisieren, wenn dein System sauber ist.
```bash
sudo rkhunter --propupd
# HINWEIS: Nur nach sauberer Baseline ausfuehren.
```

### 3. chkrootkit als zweite Meinung
```bash
sudo apt install chkrootkit
sudo chkrootkit
```
- Wenn rkhunter und chkrootkit sauber sind, ist das ein sehr gutes Zeichen.
- Log fuer spaeter:
```bash
sudo chkrootkit | tee /tmp/chkrootkit.log
```
- Auffaellige Treffer immer im Kontext pruefen, nicht blind loeschen.

### 4. Lynis für Sicherheits-Audit
```bash
sudo apt install lynis
sudo lynis audit system
```
- Liefert Härtungs-Tipps, Warnungen und einen Sicherheits-Score.
- Audit-Report:
```bash
sudo less /var/log/lynis.log
```
- Achte auf "Warnings" und "Suggestions" im Output.

### 5. Firewall aktivieren
```bash
sudo ufw enable
sudo ufw status
```
- Standardregel: eingehend blocken, ausgehend erlauben.
- Offene Ports pruefen:
```bash
sudo ufw status numbered
```
- Beispiel: SSH nur erlauben, wenn du es wirklich brauchst.
```bash
sudo ufw allow 22/tcp
# HINWEIS: Nur setzen, wenn du SSH nutzt.
```

### 6. Flatpak-App-Rechte prüfen
```bash
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
# HINWEIS: Nur noetig, wenn Flathub noch nicht eingerichtet ist.
```
```bash
flatpak install flathub com.github.tchx84.Flatseal
```
- Home-Zugriff einschränken und nur nötige Ordner freigeben.
- Kamera, Mikro und Netzwerk bewusst erlauben.
- Ziel: Apps nur das sehen lassen, was sie brauchen.
- Rechtesituation je App anzeigen:
```bash
flatpak info --show-permissions com.github.tchx84.Flatseal
```

## Erklärung
- Linux-Malware ist selten, Scans sind trotzdem sinnvoll bei sensiblen Daten, Fremdsoftware oder wenn du Gewissheit willst.
- ClamAV erkennt Trojaner, Backdoors, Skript-Malware und Windows-Malware auf USB-Sticks.
- ClamAV ist kein Echtzeit-AV, in Mint meist nicht nötig und spart Ressourcen.
- rkhunter/chkrootkit prüfen tiefe Kompromittierungen, liefern aber auch Fehlalarme.
- rkhunter-Prop-Updates nur nach sauberer Baseline setzen, sonst verfestigst du falsche Werte.
- Lynis zeigt, wie gut dein System konfiguriert ist und priorisiert Haertung.
- Prioritaeten: APT/Flatpak, Sandbox, Updates, Firewall; Scanner nur zur Kontrolle.
- Sandbox-Regeln in Flatpak sind oft wirksamer als klassische Virenscanner.
- Bei Funden: Log lesen, Quelle pruefen, dann isolieren oder entfernen.

## Varianten
- Minimal: ClamAV + Lynis + Flatseal.
- Kontrolle: rkhunter und chkrootkit gemeinsam laufen lassen.
- Tiefenscan: zusaetzlich `/` scannen und systemweite Pfade einbeziehen.
```bash
sudo clamscan -r -i / --exclude-dir="^/sys" --exclude-dir="^/proc" --exclude-dir="^/dev"
```
- Nicht nötig: Internet-Antivirus, Linux-Cleaner, Dauer-Echtzeit-Scanner, Root-Account im Alltag.

## Checkliste
- APT/Flatpak statt Downloads nutzen.
- Flatpak-Rechte einschraenken.
- Updates regelmaessig einspielen.
- Firewall aktiv halten.
- Prioritaeten: APT + Flatpak, Sandbox, Updates, Firewall, Scanner zur Kontrolle.
- Monatliche Routine ausfuehren:
```bash
sudo freshclam
clamscan -r -i /home
sudo rkhunter --check
```
