package rs.levi9.socbook2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

import rs.levi9.socbook2.domain.BookmarkUser;

@Service
public class NotificationService {
	
	private JavaMailSender javaMailSender;
	
	@Autowired
	public NotificationService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}
	
	
	public void sendNotification(BookmarkUser bookmarkUser) throws MessagingException {
		
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper;
		String emailContent = "Thank you for registration. In order to use your account, you'll need to activate it. Just click activate to confirm.<br><br>Activation code: <a href='http://localhost:8080/users/activate/" + bookmarkUser.getActivationCode() + "'>Activate your account</a>";
				
		helper = new MimeMessageHelper(message, true);
		helper.setFrom("notification@socbook2.com");
		helper.setTo(bookmarkUser.getEmail());
		helper.setSubject("Registration email");
		helper.setText(emailContent, true);
		
		javaMailSender.send(message);
	}

}
