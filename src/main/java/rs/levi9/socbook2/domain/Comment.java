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
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "bookmark_id", nullable = false)
	private Bookmark bookmark;

	@Column(nullable = false)
	@NotNull	
	private String commentContent;
	
	@Column(nullable = false)
	@NotNull	
	private Date createdAt;
	
	public Comment() {}
	
	public Comment(BookmarkUser bookmarkUser, Bookmark bookmark, String commentContent, Date createdAt) {
		
		this.bookmarkUser = bookmarkUser;
		this.bookmark = bookmark;
		this.commentContent = commentContent;
		this.createdAt = createdAt;
	}

	public BookmarkUser getBookmarkUser() {
		return bookmarkUser;
	}

	public void setBookmarkUser(BookmarkUser bookmarkUser) {
		this.bookmarkUser = bookmarkUser;
	}

	public Bookmark getBookmark() {
		return bookmark;
	}

	public void setBookmark(Bookmark bookmark) {
		this.bookmark = bookmark;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	
	
}
