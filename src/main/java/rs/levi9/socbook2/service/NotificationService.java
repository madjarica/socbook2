package rs.levi9.socbook2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import rs.levi9.socbook2.domain.BookmarkUser;

@Service
public class NotificationService {
	
	private JavaMailSender javaMailSender;
	
	@Autowired
	public NotificationService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}
	
	
	public void sendNotification(BookmarkUser bookmarkUser) throws MailException {
		
		String emailContent = "Thank you for registration. In order to use your account, you'll need to activate it. Just click activate to confirm.<br><br>Activation code: <a href='http://localhost:8080/users/activate/" + bookmarkUser.getActivationCode() + "'>Activate your account</a>";
		
		//send email		
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(bookmarkUser.getEmail());
		mail.setFrom("notification@socbook2.com");
		mail.setSubject("Registration email");
		mail.setText(emailContent);
		
		javaMailSender.send(mail);
	}

}
