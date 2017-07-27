package rs.levi9.socbook2.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "comment")
public class Comment extends BaseEntity implements Serializable {
	
	private static final long serialVersionUID = 6217177650076639639L;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private BookmarkUser bookmarkUser; 

	@Column(nullable = false, columnDefinition = "TEXT")
	@NotNull	
	private String commentContent;
	
	@Column(nullable = false)
	@NotNull	
	private Date createdDate;
	
	public Comment() {}

	public Comment(BookmarkUser bookmarkUser, String commentContent, Date createdDate) {
		super();
		this.bookmarkUser = bookmarkUser;
		this.commentContent = commentContent;
		this.createdDate = createdDate;
	}

	public BookmarkUser getBookmarkUser() {
		return bookmarkUser;
	}

	public void setBookmarkUser(BookmarkUser bookmarkUser) {
		this.bookmarkUser = bookmarkUser;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
}
